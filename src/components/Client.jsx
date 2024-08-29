// src/Client.js

import React, { useState, useRef, useEffect } from "react";
import { sendUserMessage } from "../services/api";

function Client() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    try {
      // Update local state with user's message
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, sender: "user" },
      ]);

      // Send the user's message to the chatbot API
      const botResponse = await sendUserMessage(inputText);

      // Update local state with the bot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
    } catch (error) {
      // Handle errors appropriately, e.g., show an error message to the user
      simulateBotResponse("Oops, something went wrong");
    }

    // Clear the input field
    setInputText("");
  };

  const simulateBotResponse = (message) => {
    // Simulate a response from the AI bot (replace with actual API call)
    const botResponse = "" + message;

    // Update local state with the user's message and the bot's response
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botResponse, sender: "bot" },
    ]);
  };

  return (
    <>
      <div className="h-[90vh] ">
        <div className="flex h-full justify-center items-center">
          <div className="chat-container w-full max-w-md border rounded p-4 overflow-hidden">
            <div
              ref={chatContainerRef}
              className="chat-history flex flex-col space-y-2 overflow-y-auto"
              style={{ maxHeight: "2100px" }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.sender === "user"
                      ? "text-right text-blue-500"
                      : "text-left text-green-500"
                  }
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chat-input mt-4 flex">
              <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-white border-none rounded cursor-pointer"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Client;
