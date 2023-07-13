'use client'

import { useState, useEffect } from 'react';
import secureLocalStorage from "react-secure-storage";

export default function Editor() {
  const [text, setText] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Load encrypted API key from local storage on page load
  useEffect(() => {
    const storedApiKey = secureLocalStorage.getItem('apiKey');
    if (typeof storedApiKey === 'string') {
      setApiKey(storedApiKey);
    }
  }, []);

  // Encrypt API key before saving in local storage
  const handleApiKeySubmit = () => {
    secureLocalStorage.setItem('apiKey', apiKey);

    /* TODO: remove logging */
    console.log(secureLocalStorage.getItem('apiKey'));
    setModalOpen(false);
  };

  const identifyPrompt = "Prompt for Identify Assumptions";
  const debugPrompt = "Prompt for Debug";
  const evaluatePrompt = "Prompt for Evaluate Decision";

  const makeAPICall = async (prompt: string) => {
    const message = prompt + text;

    /* TODO: Make API call to OpenAI GPT-4 API */
    console.log(`API Key: ${apiKey}`);
    console.log(`Message: ${message}`);
  }

  return (
    <div className="w-full h-screen bg-stone-50 flex flex-col items-center justify-start pt-6">
      <div className="w-1/2 flex flex-col h-full">
        <div className="navbar mb-2 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-stone-800">Tolstoi</h1>
          <button onClick={() => setModalOpen(true)} className={`w-32 px-4 py-2 rounded ${apiKey ? 'bg-stone-50 border border-stone-800 text-stone-800 text-stone-800 hover:bg-stone-800 hover:border-stone-800 hover:text-stone-50 transition-colors duration-100 ease-in-out' : 'bg-red-500 text-stone-50'}`}>API Key</button>
        </div>
        <hr />
        <textarea
          className="h-80 mt-4 p-4 text-dark-grey font-serif placeholder-dark-grey border-none rounded-md shadow-md resize-none focus:outline-none focus:ring-0 focus:ring-dark-grey"
          placeholder='Enter your thoughts...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-center mt-4 space-x-4">
          <button onClick={() => makeAPICall(identifyPrompt)} className="w-48 px-4 py-2 bg-stone-50 border border-stone-800 rounded-md text-stone-800 hover:bg-stone-800 hover:border-stone-800 hover:text-stone-50 transition-colors duration-100 ease-in-out">Identify assumptions</button>
          <button onClick={() => makeAPICall(debugPrompt)} className="w-48 px-4 py-2 bg-stone-50 border border-stone-800 rounded-md text-stone-800 hover:bg-stone-800 hover:border-stone-800 hover:text-stone-50 transition-colors duration-100 ease-in-out">Debug</button>
          <button onClick={() => makeAPICall(evaluatePrompt)} className="w-48 px-4 py-2 bg-stone-50 border border-stone-800 rounded-md text-stone-800 hover:bg-stone-800 hover:border-stone-800 hover:text-stone-50 transition-colors duration-100 ease-in-out">Evaluate decision</button>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="mb-4 text-dark-grey">Enter your OpenAI API Key</h2>
          <input 
            className="w-full p-2 mb-4 border border-dark-grey rounded text-dark-grey" 
            type="password" 
            onChange={(e) => setApiKey(e.target.value)} 
            value={apiKey} 
          />
          <button 
            className="w-full px-4 py-2 border border-dark-grey rounded text-dark-grey hover:bg-dark-grey hover:text-stone-50 transition-colors duration-200 ease-in-out"
            onClick={handleApiKeySubmit}
          >
            Submit
          </button>
        </div>
      </div>
      )}
    </div>
  );
}