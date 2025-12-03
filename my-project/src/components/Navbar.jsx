import { useState } from 'react';
import OverlayMenu from './OverlayMenu'
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [menuopen, setmenuopen] = useState(false);

  const [visible, setvisible] = useState(true)


  return (
    <>
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>

        <div className='flex items-center '>
          <img src="https://ik.imagekit.io/ixbuaqjgy/Persional%20upload/MALogo.png" alt="Logo" className='w-10 h-10' />
          <span className='text-2xl font-bold text-white hidden sm:block'>noj</span>
        </div>

        <div className='block lg:absolute lg:left-1/2 lg:transform lg:translate-x-1/2'>
          <button onClick={()=> setmenuopen(true)} className='cursor-pointer text-white text-3xl focus:outline-none' aria-label='"open Menu"'>
            <FiMenu />
          </button>
        </div>



        <div className='"hidden lg:block'>

        <a href="#contact" className='bg-gradient-to-r from-pink-500 to-blue-500  text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300'>Reach Out</a>
        </div>
      </nav>
      <OverlayMenu  isOpen= {menuopen} onClose={()=> setmenuopen(false)}/>

    </>
  )
}

export default Navbar