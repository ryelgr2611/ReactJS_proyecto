import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Equipo.css'


function Equipo() {
  return (
        <section className='flex flex-wrap justify-center gap-8 py-8 bg-red-950 bg-opacity-10 text-neutral-900'>
             <div className='relative'>
               <div className='absolute z-10 text-xl top-0 px-2 py-8 flex justify-center items-end gap-2 w-full text-neutral-300'>
                  <p className='font-bold'>Sierra</p>
                  <p>|</p>
                  <p>Expert Stylist</p>
                  <p>|</p>
                  <Link className='underline' to='/team/sierra'>Read More</Link>
               </div>
               <img className='grayscale brightness-90' src='https://images.pexels.com/photos/6962024/pexels-photo-6962024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
             </div>
             <div className='relative'>
             <div className='absolute z-10 text-xl top-0 px-2 py-8 flex justify-center items-end gap-2 w-full text-neutral-300'>
                  <p className='font-bold'>Billy</p>
                  <p>|</p>
                  <p>Master Barber</p>
                  <p>|</p>
                  <Link className='underline' to='/team/billy'>Read More</Link>
               </div>
                <img className='grayscale' src='https://images.pexels.com/photos/6475046/pexels-photo-6475046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
             </div>
             <div className='relative'>
             <div className='absolute z-10 text-xl top-0 px-2 py-8 flex justify-center items-end gap-2 w-full text-neutral-300'>
                  <p className='font-bold'>Jonny</p>
                  <p>|</p>
                  <p>Expert Stylist</p>
                  <p>|</p>
                  <Link className='underline' to='/team/jonny'>Read More</Link>
               </div>
                <img className='grayscale' src='https://images.pexels.com/photos/2834009/pexels-photo-2834009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
                
             </div>
        </section>
  )
}

export default Equipo