import { useEffect, useRef, useState } from 'react';
import OverlayMenu from './OverlayMenu'
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [menuopen, setmenuopen] = useState(false);

  const [visible, setvisible] = useState(true)
  const [forceVisible, setforceVisible] = useState(false)

  const lastScrollY = useRef(0)
  const timerId = useRef(null)

  useEffect(() => {
    const homeSection = document.querySelector("#home");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setforceVisible(true)
          setvisible(true)
        } else {
          setforceVisible(false)
        }
      }, { threshold: 0.1 }
    )
    if (homeSection) observer.observe(homeSection);
    return () => {
      if (homeSection) observer.unobserve(homeSection);
    }

  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. forceVisible की जाँच
      if (forceVisible) {
        setvisible(true); // होम सेक्शन में हमेशा visible
        return; // आगे का लॉजिक छोड़ दें
      }

      // 2. नीचे स्क्रॉल करना (स्क्रॉल डाउन)
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) { // 100px से अधिक स्क्रॉल करने पर ही छिपाएँ
        setvisible(false); // नेव बार छिपाएँ
        // यदि छिपा रहे हैं, तो टाइमर को साफ़ करने की आवश्यकता नहीं है

      }
      // 3. ऊपर स्क्रॉल करना (स्क्रॉल अप)
      else if (currentScrollY < lastScrollY.current) {
        setvisible(true); // नेव बार दिखाएँ

        // पुराने टाइमर को साफ़ करें और नया टाइमर सेट करें (ऑटो-हाइड के लिए)
        if (timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
          setvisible(false) // 3 सेकंड बाद इसे फिर से छिपा दें, यदि कोई स्क्रॉलिंग नहीं हो रही है
        }, 3000);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timerId.current) clearTimeout(timerId.current); // <--- FIX: clearTimeout() को कॉल किया जाना चाहिए
    }
  }, [forceVisible]) // dependency array में forceVisible जोड़ें


  return (
    <>
      <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-50 transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>

        <div className='flex items-center '>
          <img src="https://ik.imagekit.io/ixbuaqjgy/Persional%20upload/MALogo.png" alt="Logo" className='w-10 h-10' />
          <span className='text-2xl font-bold text-white hidden sm:block'>noj</span>
        </div>

        <div className='block lg:absolute lg:left-1/2 lg:transform lg:translate-x-1/2'>
          <button onClick={() => setmenuopen(true)} className='cursor-pointer text-white text-3xl focus:outline-none' aria-label='"open Menu"'>
            <FiMenu />
          </button>
        </div>



        <div className='"hidden lg:block'>

          <a href="#contact" className='bg-gradient-to-r from-pink-500 to-blue-500  text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300'>Reach Out</a>
        </div>
      </nav>
      <OverlayMenu isOpen={menuopen} onClose={() => setmenuopen(false)} />

    </>
  )
}

export default Navbar