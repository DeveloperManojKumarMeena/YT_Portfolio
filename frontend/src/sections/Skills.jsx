import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import { FaJs, FaHtml5, FaCss3Alt, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";
import { RiReactjsFill, RiNextjsFill } from "react-icons/ri";

const Skills = () => {
  const skills = [
    { icon: <FaJs />, name: "Java Script" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3Alt />, name: "CSS" },
    { icon: <FaNodeJs />, name: "NodeJs" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <RiReactjsFill />, name: "ReactJs" },
    { icon: <RiNextjsFill />, name: "NextJs" }
  ]

  const repeated = [...skills, ...skills]


  // animation 

  const [dir, setdir] = useState(-1);
  const [active, setactive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const tuchY = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return

    const io = new IntersectionObserver(([entry]) => {
      setactive(entry.isIntersecting && entry.intersectionRatio > 0.1);
    },
      { threshold: [0.1] }
    )
    io.observe(el);

    return () => {
      io.disconnect()
    }

  }, [])

  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => setdir(e.deltaY > 0 ? -1 : 1);
    const onTuchStart = (e) => (tuchY.current = e.tuches[0].clientY);
    const onTuchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setdir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTuchStart, { passive: true });
    window.addEventListener('touchmove', onTuchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTuchStart);
      window.removeEventListener('touchmove', onTuchMove);
    }
  }, [active])

  useEffect(()=>{
    let id ;
    let last = performance.now();
    const speed = 80;
    const tik = (now)=>{
      const dt = (now - last)/1000;
      last = now;
      let next = x.get() + dir * dt * speed;
      const loop = trackRef.current ?.scrollWidth/2 || 0 ;

      if(loop){
        if(next <= -loop) next += loop;
        if(next >= 0) next -= loop;
      }
      x.set(next);
      id = requestAnimationFrame(tik);
    }
    id = requestAnimationFrame(tik);
    return () => cancelAnimationFrame(id);
}, [dir, x]);



  return (
    <section id='skills' ref={sectionRef} className='h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black  text-white overflow-hidden'>

      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] 
          opacity-20 blur-[120px] animate-pulse'/>
        <div className='absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] 
          opacity-20 blur-[120px] animate-pulse delay-500'/>
      </div>

      <motion.h2 className='text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]'
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        My Skills
      </motion.h2>

      <motion.p className='mt-2 mb-8 text-white/90 text-base sm:text-lg z-10'
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Modern Application | Modern Technologies
      </motion.p>

      <div className='relative w-full overflow-hidden '>

        <motion.div ref={trackRef} className='flex gap-10 text-6xl text-[#1cd8d2]'
        style={{ x, whiteSpace: 'nowrap', willChange: 'transform' }}
        >
          {repeated.map((item, index) => (
            <div key={index}
              className='flex flex-col items-center gap-2 min-w-[120px]'
              aria-label={item.name}
              title={item.name}
            >
              <span className='hover:scale-125 transition-transform duration-300'>
                {item.icon}
              </span>
              <p className='text-sm'>
                {item.name}
              </p>
            </div>
          ))}

        </motion.div>

      </div>

    </section>
  )
}

export default Skills