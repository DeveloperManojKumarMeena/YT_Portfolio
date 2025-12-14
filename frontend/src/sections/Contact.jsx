import React, { useState } from 'react'
import ParticalsBackground from '../components/ParticalsBackground'
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion'

const ServiceId = import.meta.env.VITE_SERVICE_ID;
const TemplateId = import.meta.env.VITE_TEMPLATE_ID;
const PublicKey = import.meta.env.VITE_PUBLIC_KEY;




const Contact = () => {

  const [formData, setformData] = useState({
    name: '',
    email: '',
    Service: '',
    budget: '',
    idea: '',
  })

  const [error, seterror] = useState({})
  const [status, setstatus] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budget" && value && !/^\d*$/.test(value)) return;
    setformData((p) => ({ ...p, [name]: value }))
    if (error[name]) seterror((p) => ({ ...p, [name]: "" }))
  }

  const validateform = () => {
    const require = ["name", "email", "Service", "budget", "idea"]
    const newError = {}
    require.forEach((f) => !formData[f].trim() && (newError[f] = "fill this field"));
    if (formData.Service !== "other" && !formData.budget.trim())
      newError.budget = "fill this field"
    seterror(newError)
    return !Object.keys(newError).length;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateform()) return;
    setstatus("sending");

    try {
      await emailjs.send(
        ServiceId,
        TemplateId,
        {
          ...formData, from_name: formData.name,
          reply_to: formData.email
        },
        PublicKey
      );
      setstatus("Success");
      setformData({
        name: '',
        email: '',
        Service: '',
        budget: '',
        idea: '',
      })

    } catch (err) {
      console.log("Email Js Error is : " + err)
    }
  }

  return (
    <section id='contact' className='w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col
    md:flex-row items-center gap-10'>
      <ParticalsBackground />
      <div className='relative z-10 w-full flex flex-col md:flex-row items-center gap-10'>
        <motion.div className='w-full md:w-1/2 flex justify-center'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img src="https://ik.imagekit.io/e4xnddmwc/Astra.png?updatedAt=1765370404064" alt="Contact"
            className='w-72 md:w-140 rounded-2xl shadow-lg object-cover'
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        {/* right side code */}
        <motion.div className='w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-3xl font-bold mb-6'>
            Let's Work Together
          </h2>

          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>

            <div className='flex flex-col '>
              <label className='mb-1'>Your Name <span className='text-red-600 '>*</span></label>
              <input type="text" name='name' placeholder='Your Name' value={formData.name} onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${error.name ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500 `} />

              {error.name && <p className='text-red-500 text-xs'> {error.name}</p>}

            </div>

            <div className='flex flex-col '>
              <label className='mb-1'>Your E-mail <span className='text-red-600 '>*</span></label>
              <input type="email" name='email' placeholder='Your email' value={formData.email} onChange={handleChange}
                className={`p-3 rounded-md bg-white/10 border ${error.email ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500 `} />

              {error.email && <p className='text-red-500 text-xs'> {error.name}</p>}

            </div>

            <div className='flex flex-col '>
              <label className='mb-1'>Service Needed <span className='text-red-600 '>*</span></label>
              <select name="Service" value={formData.Service} onChange={handleChange} className={`p-3 rounded-md bg-white/10 border ${error.Service ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500 `}>

                <option value="" disabled className='text-black'>What You Need ?</option>
                <option value="Frontend Developer" className='text-black'>Frontend Developer</option>
                <option value="Backend Developer" className='text-black'>Backend Developer</option>
                <option value="MERN Developer" className='text-black'>MERN Developer</option>
                <option value="Other" className='text-black'>Other's</option>

              </select>
              {error.Service && <p className='text-red-500 text-xs'> {error.name}</p>}

            </div>
            {formData.Service && formData.Service !== "Other" && (
              <div className='flex flex-col'>
                <label className='mb-1'>Budget <span className='text-red-600'>*</span></label>
                <input type="text" name='budget' placeholder='Your Budget' onChange={handleChange} value={formData.budget}  
                className={`p-3 rounded-md bg-white/10 border ${error.budget ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500 `}
                />

              </div>
            )}

            <div className='flex flex-col'> 
            <label className='mb-1'>Explane Your Idea <span className='text-red-500'>*</span></label>
            <textarea name="idea" rows={5} placeholder='Enter Your Idea' value={formData.idea} onChange={handleChange}
             className={`p-3 rounded-md bg-white/10 border ${error.budget ? "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500 `}
            ></textarea>
            {error.Service && <p className='text-red-500 text-xs'> {error.name}</p>}
            </div>
            {status && (
              <p className={`text-sm ${status=="Success" ? "text-green-700" : status =="error" ? "text-red-600" : "text-yellow-500"}`}>
                {status === "sending" ? "Sending..." : status === "Success" ? "Message sent successfully!" : "Something went wrong. Please try again."}
              </p>
            )}

            <motion.button className='bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition'
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            disabled={status === "sending"}
            type='submit'
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>

          </form>
        </motion.div>

      </div>

    </section>
  )
}

export default Contact