"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  function generateStory() {
    setLoading(true);
    const fetchStory = async () => {
      const res = await fetch("/api/llm");
      const data = await res.json();
      setStory(data.story);
      setLoading(false);
    };
    fetchStory();
  }

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

        {/* Render the button, but disable it when loading */}
        <button
          className={`bg-green-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={generateStory}
          disabled={loading}
        >
          Generate Story
        </button>
      </div>
    </>
  );
}
