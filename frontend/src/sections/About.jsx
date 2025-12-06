import React from 'react'
import { motion, spring } from 'framer-motion'

const About = () => {

  const stats = [
    { label: "Experience", value: "1+year" },
    { label: "Speciality", value: "MERN Stack" },
    { label: "Focus", value: "Performance & UX" }
  ]

  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "-bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "-top-1/2 left-1/2 translate-x-1/2 translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]",
  ]

  return (
    <section id='about'
      className='min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none'>
        {glows.map((g, i) => (
          <div key={i} className={`absolute rounded-full  bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] animate-pulse ${g}`} />
        ))}
      </div>

      <div className='relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12'>
        <motion.div
          className='flex flex-col md:flex-row items-center md:items-stretch gap-8 '
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}>

          <motion.div className='relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl  bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] border border-[#1cd8d2]/25 '
            whileHover={{ scale: 1.02 }}
            transition={{ type: spring, stiffness: 200, damping: 18 }}
          >
            <img src="https://ik.imagekit.io/e4xnddmwc/Gemini_Generated_Image_o999t0o999t0o999.png" alt="Manoj Kumar" className='absolute inset-0' />
          </motion.div>

          <div className='flex-1 flex flex-col justify-center text-center md:text-left'>
            <h2 className='text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent 
           bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2] '>
              Manoj Kumar
            </h2>
            <p className='mt-2 text-lg sm:textxl text-white/90 font-semibold'>
              MERN Full Stack Developer
            </p>
            <p className='mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl'>
              I am a passionate Full-Stack Web Developer focused on building fast, scalable and user-centric digital products. I love turning ideas into clean, functional and visually engaging web experiences. With strong skills in modern frontend and backend technologies, I continuously learn, improve and create solutions that make a real impact
            </p>

            <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl'>
              {stats.map((items, index) => {
                return (
                  <motion.div key={index}
                    className='rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center'
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.4 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >

                    <div className='text-sm text-gray-400'>
                      {items.label}
                    </div>
                    <div className='text-base font-semibold'>
                      {items.value}
                    </div>

                  </motion.div>
                )
              }

              )}
            </div>

            <div className=' mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start'>
              <a href="#projects" className='inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-400  transition'>View Project</a>
              <a href="#contact" className='inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-5 py-3 hover:bg-white/20 transition'>Get In Touch</a>
            </div>



          </div>


        </motion.div>

        <motion.div className='text-center md:left'
        initial={{opacity:0 , x:-30}}
        whileInView={{opacity:1, x:0}}
        transition={{duration:0.6}}
        viewport={{once:true, amount:0.4}}
        >
          <h3 className='text-2xl sm:text-3xl font-bold text-white mb-3'>
            About Me
          </h3>
          <p className='text-gray-300 leading-relaxed  text-base sm:text-lg'>
            I'm a passionate Full-Stack Developer who loves building clean, modern and responsive digital experiences. I enjoy turning ideas into interactive products that look great and perform flawlessly.
          </p>
          <p className='mt-4 text-gray-400 text-base sm:text-lg'>
            I constantly learn new technologies and improve my craft, aiming to deliver scalable, secure and high-quality solutions that make a real impact for users and businesses.
          </p>
        </motion.div>


      </div>


    </section>
  )
}

export default About