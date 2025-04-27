import React from 'react'

const Footer = () => {
  return (
    <div className='w-full text-white flex flex-col justify-center items-center bg-slate-800'>
      <div className="logo text-purple-500 font-bold text-2xl">&lt;Pass<span className='text-white'>OP/&gt;</span></div>
      <div className='flex'>Created With <img className='w-5' src="/public/heart.png" alt="heart" /> By Sushovan Chakraborty</div>
    </div>
  )
}

export default Footer
