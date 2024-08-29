import React, { useState, useRef, useEffect } from "react";
import { sendUserMessage } from "../services/api";
import robo from "../assets/robo.jpg";

const Chatbot = () => {
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

  function whichMakesNoSense(value) {
    return value;
  }
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
      simulateBotResponse(botResponse);
      console.log(botResponse);

      // Update local state with the bot's response
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { text: botResponse, sender: "bot" },
      // ]);
    } catch (error) {
      // Handle errors appropriately, e.g., show an error message to the user
      simulateBotResponse("Oops, something went wrong");
    }

    // Clear the input field
    setInputText("");
  };

  const simulateBotResponse = (message) => {
    // Simulate a response from the AI bot (replace with actual API call)
    const botResponse = `BOT: ${message}`;

    // Update local state with the user's message and the bot's response
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botResponse, sender: "bot" },
    ]);
  };
  return (
    <>
      <>
        <div className="text-white h-[90vh]">
          <div className="flex h-full w-full">
            <div className="text-black w-[30%] flex-col justify-end">
              <div className="h-full p-4 overflow-y-auto">
                <div className="rounded-md bg-slate-200 h-full text-black flex items-center justify-center">
                  <img
                    className="h-full object-cover rounded-md"
                    src={robo}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="flex-col text-black h-[100%] w-[100%]">
              <div className="h-full p-5 ">
                <div className=" p-5 rounded-md h-full border w-full">
                  <div>
                    <div className="bg-slate-100 rounded-md ">
                      <div className="p-5">
                        <div className="text-center text-2xl font-bold">
                          <div>Legal Assistant</div>
                        </div>
                      </div>
                    </div>
                    <div ref={chatContainerRef} className="w-full h-[34rem] ">
                      <div className="">
                        <div className="p-5 h-[34rem] flex flex-col-reverse">
                          <div className="space-y-2 overflow-y-auto flex-1">
                            {messages.map((message, index) => (
                              <div
                                key={index}
                                className={
                                  message.sender === "user"
                                    ? "text-right mb-2"
                                    : "text-left mb-2"
                                }
                              >
                                <div
                                  className={
                                    message.sender === "user"
                                      ? "bg-blue-500 text-white p-3 rounded-tl-lg rounded-bl-lg rounded-br-lg self-end inline-block"
                                      : "bg-green-500 text-white p-3 rounded-tr-lg rounded-bl-lg rounded-br-lg self-start inline-block"
                                  }
                                >
                                  {message.text}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                    >
                      <div className="border border-gray-300 bg-slate-100 p-6 rounded-md flex items-center">
                        <input
                          type="text"
                          value={inputText}
                          onChange={handleInputChange}
                          placeholder="Message LegalAssitant..."
                          className="flex-1 p-2 border rounded"
                        />
                        <button
                          type="submit"
                          className="p-2 bg-blue-500 text-white border-none rounded cursor-pointer ml-2"
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Chatbot;
