import TextField from "./components/TextField.jsx";
import { useState } from "react";
import logo from "./assets/logo.svg"

function App() {
  const [summary, setSummary] = useState('');

  const handleSummary = (result) => {
    setSummary(result);
  }

  return(
    <div className="flex flex-col justify-center items-center bg-slate-900 text-neutral-50 min-h-screen box-border">
      <img src={logo} alt="logo" className='m-10 lg:m-40'/>
      <div className="w-full text-center text-slate-200 font-primary text-pretty my-[10vh] opacity-80">
        <h1 className="text-2xl md:text-6xl">Summarize it!</h1>
        <p className="text-sm md:text-2xl md:pt-5">Summarize anything...docs, notes, emails, articles etc.</p>
      </div>

      <TextField onSummarize={handleSummary} /> 

      {summary && (
        <textarea className='font-secondary p-4 text-justify md:text-2xl bg-slate-700 rounded-xl mx-5 md:mx-10 lg:mx-15 text-pretty my-6' rows="8">{summary}</textarea>
      )}
    </div>
  )
}

export default App;
