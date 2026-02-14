import React from 'react'

const TextField = () => {
  return (
    <div className='bg-red w-full h-30 bg-slate-800 rounded-tl- absolute bottom-0 font-secondary flex justify-center'>
      <textarea className='bg-slate-700 mt-5 p-2 text-sm h-20 w-[80vw] rounded-2xl' placeholder='Type something'></textarea>
    </div>
  )
}

export default TextField;