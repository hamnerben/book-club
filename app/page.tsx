"use client";
import Image from "next/image";
import { useState } from "react";
import Icon from '@mdi/react';
import { mdiArrowUp } from '@mdi/js';
import { marked }  from 'marked';
import ReactMarkdown  from 'react-markdown'

export default function Home() {
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  

async function sendMessage() {
    try {
      appendUserMessage(userInput); // Append the user message to the conversation
      setUserInput(""); // Clear the input field after sending the message

      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      appendAssistantMessage(data.content); // Append the assistant's response to the conversation
    } 
    catch (error) {
      console.error('Error:', error);
    } 
    finally {
      setLoading(false);
    }
  }

  function appendUserMessage(message: string) {
    setConversation((prev) => [
      ...prev,
      { role: "user", content: message },
    ]);
  }

  function appendAssistantMessage(message: string) {
    setConversation((prev) => [
      ...prev,
      { role: "assistant", content: message },
    ]);
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage(); // Call the sendMessage function directly
    }
  };

 

  return (
    <>
      <h2 className="flex text-green-700 justify-center text-7xl font-mono">
        Bedtime Story?
      </h2>
      <div className="flex flex-col items-center justify-center h-1/2">

        {/* Conditionally render loading text */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-1/2">
            <h2 className="text-green-700 text-3xl font-mono">Generating...</h2>
          </div>
        )}

        {/* Conditionally render the story */}
        {!loading && conversation.length > 0 && (
          // <div className="flex flex-col items-center justify-center h-1/2">
            <div className="border border-green-700 rounded p-4 mt-4 w-80">
              {conversation.map((message, index) => (
                <div 
                  key={index} 
                  className={`text-${message.role === 'user' ? 'blue' : 'green'}-700 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <ReactMarkdown>
                  {message.content}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          // </div>
        )}

        {/* User input and button */}
        <div className="flex flex-row items-center">
          {/* user input */}
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown} // Add the keydown event handler
            placeholder="Enter a prompt for your story..."
            className="border border-green-700 text-blue-700 rounded py-2 px-4 mb-4 w-80"
          />
          {/* Button, but disable it when loading */}
          <button
            className={`bg-green-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={sendMessage}
            disabled={loading}
          >
            <Icon path={mdiArrowUp} size={1} />
          </button>
        </div>

      </div>
    </>
  );
}
