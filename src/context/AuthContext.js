import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  showWarning: false,
  stayLoggedIn: () => {},
  updateAvatar: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;

    try {
      const parsed = JSON.parse(storedUser);
      if (parsed.token && jwtDecode(parsed.token).exp * 1000 > Date.now()) {
        return parsed;
      }
      localStorage.removeItem("user");
      return null;
    } catch (err) {
      console.error("Invalid user in localStorage:", err);
      localStorage.removeItem("user");
      return null;
    }
  });

  const [showWarning, setShowWarning] = useState(false);

  const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes
  const WARNING_TIME = 1 * 60 * 1000; // 1 minute before logout

  const activityTimeout = useRef(null);
  const warningTimeout = useRef(null);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // optional, redundant now
    setUser(null);
    setShowWarning(false);
  };
  const login = (userData) => {
    const decoded = jwtDecode(userData.token);

    const fullUser = {
      token: userData.token,
      ...userData.user, // this includes name, role, avatar
      ...decoded, // optional if you want exp etc
    };

    setUser(fullUser);
    localStorage.setItem("user", JSON.stringify(fullUser));
  };

  const resetInactivityTimer = () => {
    if (activityTimeout.current) clearTimeout(activityTimeout.current);
    if (warningTimeout.current) clearTimeout(warningTimeout.current);
    setShowWarning(false);

    warningTimeout.current = setTimeout(() => {
      setShowWarning(true);
    }, INACTIVITY_LIMIT - WARNING_TIME);

    activityTimeout.current = setTimeout(() => {
      logout();
    }, INACTIVITY_LIMIT);
  };

  const stayLoggedIn = () => {
    resetInactivityTimer(); // extend session
    setShowWarning(false);
  };
  const updateAvatar = (newAvatarUrl) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, avatar: newAvatarUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ persist
      return updatedUser;
    });
  };
  useEffect(() => {
    if (!user) return;

    const handleActivity = () => resetInactivityTimer();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("click", handleActivity);

    resetInactivityTimer();

    return () => {
      clearTimeout(activityTimeout.current);
      clearTimeout(warningTimeout.current);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        showWarning,
        stayLoggedIn,
        updateAvatar,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
