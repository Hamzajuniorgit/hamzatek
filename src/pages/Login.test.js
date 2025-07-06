import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Login from "./Login";

jest.mock("axios");

test("displays error message on failed login", async () => {
  // Mock the failed login response
  axios.post.mockRejectedValueOnce({
    response: { data: { msg: "Invalid credentials" } },
  });

  render(<Login />);

  // Simulate user input
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "wrongpassword" },
  });

  // Simulate form submission
  fireEvent.click(screen.getByText("Login"));

  // Wait for the error message to appear
  const errorMessage = await screen.findByText(/Invalid credentials/i);
  expect(errorMessage).toBeInTheDocument();
});
