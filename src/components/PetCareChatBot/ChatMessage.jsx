import React from "react";
import Logo from "../../assets/pawtopia_logo.svg";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ chat }) => {
  return (
    !chat.hideInChat && (
      <div
        className={`flex items-start gap-2 ${
          chat.role === "model" ? "" : "justify-end"
        }`}
      >
        {chat.role === "model" && (
          <img
            src={Logo}
            alt="Cobbie"
            className="h-8 w-8 rounded-full bg-altTagColor p-1"
          />
        )}
        <div
          className={`p-3 text-sm max-w-xs whitespace-pre-line leading-relaxed ${
            chat.role === "model"
              ? "bg-gray-100 text-gray-900 rounded-bl-lg rounded-tr-lg rounded-br-lg"
              : "bg-altTagColor text-white rounded-br-lg rounded-tl-lg rounded-tr-lg"
          }`}
        >
          <ReactMarkdown
            components={{
              // Customize link style to be cyan and add hover underline
              a: ({ node, ...props }) => (
                <a {...props} className="text-cyan-500 hover:underline" />
              ),
            }}
          >
            {chat.text}
          </ReactMarkdown>
        </div>
      </div>
    )
  );
};

export default ChatMessage;
