import React, { useEffect, useRef, useState } from "react";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import companyInfo from "./companyInfo";
import Logo from "../../assets/pawtopia_logo.svg";
import {
  ChatBubbleLeftEllipsisIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

function Chatbot() {
  const [chatHistory, setChatHistory] = useState([
    { hideInChat: true, role: "model", text: companyInfo },
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  // Function to update chat history
  const updateHistory = (text, isError = false) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text !== "Purring..."),
      { role: "model", text, isError },
    ]);
  };

  // Function to handle bot response
  const generateBotResponse = async (history) => {
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      console.log("API Response:", response);

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      const responseText = await response.text();

      if (!responseText) {
        updateHistory(
          "Cobbie is currently unavailable. Please try again later.",
          true
        );
        return;
      }

      const data = JSON.parse(responseText);

      if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
        throw new Error("Invalid response format from API");
      }

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      updateHistory(error.message || "Cobbie went Dizzy!", true);
    }
  };

  // Auto-scroll effect when new messages appear
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="h-12 w-12 rounded-full bg-altTagColor hover:bg-opacity-80 flex items-center justify-center shadow-lg transition"
      >
        <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-white" />
      </button>

      {/* Chatbot Popup */}
      <div
        className={`absolute bottom-14 right-0 w-96 bg-white rounded-lg shadow-xl transform transition-all ${
          showChatbot
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between bg-altTagColor p-4 rounded-t-lg">
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="Cobbie Logo"
              className="h-9 w-9 rounded-full bg-white p-1"
            />
            <h2 className="text-white text-lg font-semibold">Cobbie</h2>
          </div>
          <button
            onClick={() => setShowChatbot(false)}
            className="text-white hover:text-gray-200 transition"
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Chat Body */}
        <div
          ref={chatBodyRef}
          className="h-[400px] overflow-y-auto p-4 space-y-4 pb-2"
        >
          <div className="flex gap-2 items-start">
            <img
              src={Logo}
              alt="Cobbie"
              className="h-8 w-8 rounded-full bg-altTagColor p-1"
            />
            <p className="bg-gray-100 p-3 rounded-lg text-sm">
              Hey there, hooman! 🐶 It’s Cobbie, your furriend! Need pet care
              tips? I’m here to lend a paw! How can I help?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chat Footer */}
        <div className="p-4 bg-white border-t">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
