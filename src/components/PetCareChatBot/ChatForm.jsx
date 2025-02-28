import React, { useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

function ChatForm({ chatHistory, setChatHistory, generateBotResponse }) {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Purring..." },
      ]);
      generateBotResponse([
        ...chatHistory,
        {
          role: "user",
          text: `Using the details provided above, please address this query: ${userMessage}`,
        },
      ]);
    }, 600);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-2"
    >
      <input
        ref={inputRef}
        type="text"
        className="flex-grow outline-none px-2 text-sm"
        placeholder="Feel free to ask Cobbie! 🐾"
        required
      />
      <button className="h-8 w-8 flex items-center justify-center rounded-full bg-altTagColor hover:bg-opacity-80 text-white transition">
        <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
      </button>
    </form>
  );
}

export default ChatForm;
