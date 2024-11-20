import React from 'react'
import { Navbar } from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'

import Title from './Components/Title/Title'
import About from './Components/About/About'
import Campus from './Components/Campus/Campus'

import Contact from './Components/Contact/Contact'
import Footer from './Components/Footer/Footer'
import Getstarted from './Components/Getstarted/Getstarted'
import Chatbot from './Components/Chatbot/Chatbot'






export const App = () => {
  return (
    <div>
      <Navbar/>
      <Chatbot/>
      <Hero/>
      <div className="contianer">
        
      <About/>
      <Title subTitle='Languages' title='Code Supported' />
      <Campus/>

      <Title subTitle='Get Started' title='Begin Your Transformation' />
      <Getstarted/>
      
      
      <Title subTitle='Contact Us' title='Get in Touch' />
      <Contact/>
      <Footer/>


      </div>
      
      
      
      

    </div>
  )
}
export default App





