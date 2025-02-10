import React from 'react'

const Navbar = () => {
    return (
        <nav className="border-b p-4 sm:px-6 lg:px-8 w-full">
            <div className='px-4 w-full flex justify-between items-center'>
                <p className=" text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    TensaiBot
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors cursor-pointer">
                Get Started
              </button>
            </div>
        </nav>
    )
}

export default Navbar