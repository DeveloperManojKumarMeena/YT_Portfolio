import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ParticalsBackground from '../components/ParticalsBackground'



const Home = () => {


  const roles = useMemo(() => ["Web Developer", "Frontend Developer", "MERN Stack Developer", "Backend Developer"], [])

  const [index, setindex] = React.useState(0)
  const [subindex, setsubindex] = React.useState(0)
  const [deleting, setdeleting] = React.useState(false)

  React.useEffect(() => {
    const currentRole = roles[index]
    const timeout = setTimeout(() => {
      if (!deleting && subindex < currentRole.length) setsubindex(v => v + 1);
      else if (!deleting && subindex === currentRole.length) setTimeout(() => setdeleting(true), 1200)
      else if (deleting && subindex > 0) setsubindex(v => v - 1);
      else if (deleting && subindex === 0) { // <-- && का उपयोग किया गया और कर्ली ब्रेसेस जोड़ी गईं
        setdeleting(false);
        setindex(p => (p + 1) % roles.length);
      }

    }, deleting ? 40 : 60)

    return () => clearTimeout(timeout)
  }, [subindex, index, deleting, roles])


  return (
    <section id='home' className='w-full h-screen relative bg-black overflow-hidden'>
      <ParticalsBackground />
      <div className='absolute inset-0 '>
        <div className='absolute top-32 left-0
      w-[70vw] sm:w-[50vw] md:w-[40vw]
      h-[70vw] sm:h-[50vh] md:h-[40vh]
      max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10
      blur-[100px] sm:blur-[130px] md:blur-[150px]
      animate-pulse'></div>

        <div className='absolute bottom-0 right-0
      w-[70vw] sm:w-[50vw] md:w-[40vw]
      h-[70vw] sm:h-[50vh] md:h-[40vh]
      max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10
      blur-[100px] sm:blur-[130px] md:blur-[150px]
      animate-pulse delay-500'> </div>
      </div>


      <div className=' relative z-10 h-full w-full  mx-auto px-20 grid grid-cols-1 lg:grid-cols-2 '>
        <div className=' flex flex-col justify-center h-full text-center lg:text-left relative'>
          <div className='w-full lg:pr-24 mx-auto max-w-[48rem]'>
            <motion.div
              className='mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]'
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subindex)}</span>
              <span className='inline-block w-[2px] ml-1 bg-white animate-pulse align-middle' style={{ height: "1em" }}></span>
            </motion.div>

            <motion.h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg'
             initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}>Hello I'm <br />
              <span className='text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:whitespace-nowrap'>Manoj Kumar</span>
            </motion.h1>
            
            <motion.p className='mt-6 text-white/75 text-sm sm:text-base md:text-lg leading-relaxed'
             initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4 ,delay:0.2}}>
              I'm a passionate web developer specializing in creating dynamic and beautiful web applications. With a strong foundation in both frontend and backend technologies, I strive to build seamless user experiences and efficient solutions.
            </motion.p> 
            <motion.div className='mt-10 flex flex-wrap gap-6 items-center justify-center lg:justify-start'
            initial={{ opacity: 0,}}
              animate={{ opacity: 1, }}
              transition={{ duration: 0.8 ,delay:0.8}}
            >
              <a href="#Projects" 
              className='px-6 py-3 rounded-full font-medium text-lg text-white  bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] shadow-lg hover:scale-105 transition-all '
              >View My Work</a>
              <a href="/Manoj Kumar.pdf" download className='px-6 py-3 rounded-full font-medium text-lg text-black bg-white hover:text-gray-800  hover:scale-105 transition-all'>My Resume</a>
            </motion.div>

          </div>
        </div>
      </div>


    </section>
  )
}

export default Home