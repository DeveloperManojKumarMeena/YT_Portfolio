import React from 'react'
import Navbar from './components/Navbar'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Testmoniyals from './sections/Testmoniyals'
import Contact from './sections/Contact'
import Foooter from './sections/Foooter'
import ParticalsBackground from './components/ParticalsBackground'

const App = () => {
  return (
    <div className='relative gradient text-white'>
      <ParticalsBackground/>
      <Navbar/>
      <Home/>
      <About/>
      <Skills/>
      <Projects/>
      <Experience/>
      <Testmoniyals/>
      <Contact/>
      <Foooter/>
    </div>
  )
}

export default App