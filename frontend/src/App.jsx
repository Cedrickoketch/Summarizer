import Navbar from "./components/Navbar.jsx"
import TextField from "./components/TextField.jsx";
import { useState } from "react";

function App() {
  const [summary, setSummary] = useState('');

  const handleSummary = (result) => {
    setSummary(result);
  }

  return(
    <div className="bg-slate-900 text-neutral-50 h-fit md:h-screen">
      <Navbar />
      <div className="absolute top-0 w-full text-center text-slate-200 font-primary text-pretty mt-[10vh] opacity-80">
        <h1 className="text-2xl md:text-6xl">Summarize it!</h1>
        <p className="text-sm md:text-2xl md:pt-5">Summarize anything...docs, notes, emails, articles etc.</p>
      </div>

      <TextField onSummarize={handleSummary} /> 

      {summary && (
        <div className='font-secondary text-center md:text-2xl bg-slate-700 rounded-2xl mx-5 text-pretty p-2 mt-4'>
          <div>{summary}</div>
        </div>
      )}
    </div>
  )
}

export default App;
