import React, { useState } from 'react'
import { FiSidebar } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
        {/* mobile Navbar */}
        <div className={`lg:hidden h-[100vh] w-[20vh] rounded-br-lg drop-shadow-neutral-950 drop-shadow-sm transition-colors 0.5s ease-in ${isMenuOpen === false ? "bg-slate-800" : "bg-none"}`}>
            <button className='text-2xl p-2'
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen === true ? <FiSidebar /> : <IoCloseOutline />}
            </button>

            <div className={`p-5 flex flex-col gap-5 text-xl list-none transition-all 1s ease-in  ${isMenuOpen ? "-ml-100" : "ml-0"}`}>
                <li><a href="#">Home</a></li>
                <li><a href="#">History</a></li>
                <li><a className='sign' href="#">Sign-in</a></li>
                <li><a className='sign' href="#">Sign up</a></li>
            </div>
        </div>
    </div>
  )
}

export default Navbar