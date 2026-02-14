import React from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { useState } from 'react';

const TextField = ({ onSummarize }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  
  const handleSummarize = async () => {
    if (!text.trim() || loading) return;
  
    setLoading(true);
    setStatus('Contacting AI...');
  
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 90000);

      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ text: text.trim() }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json()

      if (data.summary) {
        onSummarize(data.summary);
        setStatus('Summary generated!');
      } else {
        setStatus('No summary returned');
      }
    } catch (error) {
      console.error('Summarize error:', error);
      if (error.name === 'AbortError') {
        setStatus('Request timed out');
      } else {
        setStatus(`${error.message} (Is Flask running?)`);
      }

      onSummarize(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
    onSummarize={handleSummarize}
    className='flex flex-col items-center gap-4 md:gap-8'
    >
      <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      rows="8"
      disabled={loading}
      className='font-secondary w-[90vw] bg-slate-700 rounded-xl p-8 md:text-2xl text-pretty'  
      placeholder='Paste something to summarize' />

      <button
      onClick={handleSummarize}
      disabled={!text.trim() || loading}
      className='font-primary md:text-4xl bg-slate-600 p-4 rounded-lg shadow-slate-950'
      >
        {loading ? 'Summarizing...' : 'Generate Summary'}
      </button>

      {status && <div className='font-primary text-primary text-center md:text-4xl opacity-70'>{status}</div>}
      
    </div>
  )
}

export default TextField;