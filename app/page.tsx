"use client";
import Image from "next/image";
import { useState } from "react";
import Icon from '@mdi/react';
import { mdiArrowUp } from '@mdi/js';

export default function Home() {
  const [story, setStory] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  

async function sendMessage() {
    try {
      setLoading(true);
      
      const message = userInput;
      setUserInput(""); // Clear the input field after sending the message

      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      setStory(data.content);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
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
        {!loading && story && (
          <div className="flex flex-col items-center justify-center h-1/2">
            <h2 className="text-green-700 text-3xl font-mono">{story}</h2>
          </div>
        )}
        <div className="flex flex-row items-center">
          {/* user input */}
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown} // Add the keydown event handler
            placeholder="Enter a prompt for your story..."
            className="border border-green-700 text-green-700 rounded py-2 px-4 mb-4 w-80"
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
