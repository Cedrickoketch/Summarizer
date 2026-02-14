import Navbar from "./components/Navbar.jsx"
import TextField from "./components/TextField.jsx";

function App() {
  return(
    <div className="bg-slate-900 text-neutral-50 h-[100vh]">
      <div className="absolute top-0 w-full snap-center text-center text-slate-400 font-primary text-pretty mt-[30vh]">
        <h1 className="text-2xl">Summarize it!</h1>
        <p className="text-sm">What are we summarizing today?</p>
      </div>

      <Navbar />
      <TextField />
    </div>
  )
}

export default App;
