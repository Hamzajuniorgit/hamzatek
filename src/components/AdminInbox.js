import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import axiosInstance from "../services/axiosInstance";

const AdminInbox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosInstance.get("/contact/messages");
        if (res.data.success) {
          setMessages(res.data.messages);
        } else {
          toast.error(res.data.msg);
        }
      } catch (err) {
        toast.error("Failed to fetch messages.");
      }
    };
    fetchMessages();
  }, []);

  return (
    <section className="bg-white p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Inbox Messages
      </h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-b">
                  <td className="px-4 py-2">{msg.name}</td>
                  <td className="px-4 py-2">{msg.email}</td>
                  <td className="px-4 py-2">{msg.message}</td>
                  <td className="px-4 py-2">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminInbox;
