import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useScroll, useMotionValueEvent, AnimatePresence, motion } from 'framer-motion'
const Projects = () => {

  const useIsMobile = (query = '(max-width: 639px)') => {
    const [isMobile, setIsMobile] = useState(
      typeof window !== 'undefined' && window.matchMedia(query).matches
    );

    useEffect(() => {
      if (typeof window === 'undefined') return;

      const mediaQueryList = window.matchMedia(query);

      const handler = (event) => {
        setIsMobile(event.matches);

        mediaQueryList.addEventListener('change', handler);

        setIsMobile(mediaQueryList.matches);

        return () => mediaQueryList.removeEventListener('change', handler);
      }
    }, [query]);
    return isMobile;
  }

  const isMobile = useIsMobile();

  const sceRef = useRef(null);

  const projects = useMemo(() => [
    {
      title: 'nk studio',
      link: "https://www.nk.studio",
      bgColor: '#0d4d3d',
      image: isMobile ? 'https://ik.imagekit.io/e4xnddmwc/photo1.JPG' : 'https://ik.imagekit.io/e4xnddmwc/img1.JPG'
    },
    {
      title: 'Gamily',
      link: 'https://gamilyapp.com',
      bgColor: '#3884d3',
      image: isMobile ? 'https://ik.imagekit.io/e4xnddmwc/photo2.PNG' : 'https://ik.imagekit.io/e4xnddmwc/img2.JPG'
    },
    {
      title: 'Hungry Tiger',
      link: "https://www.eathungrytiger.com",
      bgColor: '#dc9317',
      image: isMobile ? 'https://ik.imagekit.io/e4xnddmwc/photo3.png' : 'https://ik.imagekit.io/e4xnddmwc/img3.JPG'
    },
  ]
    , [isMobile]);


  const { scrollYProgress } = useScroll({
    target: sceRef,
    offset: ["start start", "end end"]
  });

  const threshold = projects.map((_, i) => (i + 1) / projects.length)

  const [activeIndex, setactiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = threshold.findIndex((t) => v <= t);
    setactiveIndex(idx === -1 ? threshold.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section ref={sceRef} id='projects' className='relative text-white'
      style={{
        height: `${100 * projects.length}vh`,
        background: activeProject.bgColor,
        transition: "background-color 400ms ease"
      }}>

      <div className=' sticky top-0 h-screen flex flex-col items-center justify-center'>
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}>My Work</h2>

        <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" : ""}`}>
          {projects.map((projects, idx) => {
            return( <div key={projects.title} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeIndex === idx ? "opacity-100 z-20 " : "opacity-0 z-0 sm:z-10"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode='wait'>
                {activeIndex === idx && (
                  <motion.h3 key={projects.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white sm:absolute sm:-top-20 sm:left-[35%] lg:left-[5%] sm:mb-0
                      italic font-semibold 
                      ${isMobile ? "-mt-24" : ""}`}
                      style={{zIndex: 5 , textAlign:isMobile? "center": "left",

                      }}
                  >
                    {projects.title}
                  </motion.h3>
                )}
              </AnimatePresence>

                <div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl
                  md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${isMobile? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"} h-[62vh] sm:h-[66vh] `}
                  style={{zIndex:10 , transition:"box-shadow 250ms ease"}}
                  >
                  <img src={projects.image} alt={projects.title}  
                  className='w-full h-full  drop-shadow-xl md:drop-shadow-2xl'
                  style={
                      {position:"relative", zIndex:10, 
                        filter:"drop-shadow(0,16px,40px rgba(0,0,0,0.65))",
                        transition:"filter 200ms ease",

                      }
                  } 
                 loading='lazy' />
                 <div className='pointer-events-none absolute inset-0'
                 style={{zIndex:11,
                  background:"linear-gradient(100deg , rgba(0,0,0,0.12)0% , rgba(0,0,0,0)40%) "
                 }}> 

                 </div>
                </div>

            </div>)
          })}
        </div>


          <div className={`absolute ${isMobile?"bottom-20" : "bottom-10"}`}>
            <a href={activeProject.link} target='_blank' rel='noopener noreferrer' className='inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-300 transition-all '
            aria-label={`view ${activeProject?.title}`}>view Project</a>
          </div>

      </div>


    </section>
  )
}

export default Projects