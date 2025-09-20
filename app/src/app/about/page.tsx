import React from 'react'
import { Button } from '@/components/ui/button'
import { Users, Target, Lightbulb, Mail } from 'lucide-react'

const About = () => {
  return (
    <section className='mx-8 border-x-1 flex justify-center items-center'>
      <div className='mt-9 text-center flex space-y-6 flex-col max-w-4xl'>
        <h1 className='text-6xl font-medium tracking-tight'>About <br/> ResumeLab</h1>
        <p className='text-lg'>
          We believe that creating a professional resume shouldn't be complicated.<br/> 
          Our mission is to democratize career opportunities through intelligent design.
        </p>
        
        <div className='grid md:grid-cols-3 gap-8  text-left'>
          <div className='flex flex-col items-center space-y-4 p-6'>
            <Target className='w-12 h-12 text-blue-600' />
            <h3 className='text-xl font-semibold'>Our Mission</h3>
            <p className='text-sm text-gray-600 text-center'>
              To empower job seekers with tools that showcase their potential and help them land their dream jobs.
            </p>
          </div>
          
          <div className='flex flex-col items-center space-y-4 p-6'>
            <Lightbulb className='w-12 h-12 text-yellow-600' />
            <h3 className='text-xl font-semibold'>Innovation</h3>
            <p className='text-sm text-gray-600 text-center'>
              We combine cutting-edge technology with proven design principles to create resumes that stand out.
            </p>
          </div>
          
          <div className='flex flex-col items-center space-y-4 p-6'>
            <Users className='w-12 h-12 text-green-600' />
            <h3 className='text-xl font-semibold'>Community</h3>
            <p className='text-sm text-gray-600 text-center'>
              Join thousands of professionals who have successfully transformed their careers with ResumeLab.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About