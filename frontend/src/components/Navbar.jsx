import React, { useState } from 'react'
import { FiSidebar } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoAdd } from "react-icons/io5";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
        {/* mobile Navbar */}
        <div className={`top-0 sticky lg:hidden bg-slate-600 h-[100vh] rounded-br-lg rounded-tr-lg drop-shadow-neutral-950 drop-shadow-sm transition-colors 0.5s ease-in ${isMenuOpen === true ? "w-[12vw]" : "w-[40vw]"} `}>
            <button className='text-2xl md:text-6xl p-2 md:p-4'
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen === true ? <FiSidebar /> : <IoCloseOutline />}
            </button>

            <div className={`p-5 md:p-10 flex flex-col gap-5 md:gap-10 list-none transition-all 1s ease-in  ${isMenuOpen ? "-ml-100" : "ml-0"}`}>
                <li><a className='flex items-center gap-1 md:text-4xl' href="#"><FaHistory className='text-lg md:text-4xl'/> History</a></li>
                <li><a className='flex items-center gap-1 md:text-4xl' href="#"><MdOutlineAccountCircle className='md:text-4xl'/> Account</a></li>
                <li><a className='flex items-center gap-1 md:text-4xl whitespace-nowrap' href="#"><IoAdd className='text-lg md:text-4xl'/> New chat</a></li>
            </div>
        </div>
    </div>
  )
}

export default Navbar