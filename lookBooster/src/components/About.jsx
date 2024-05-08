import React from 'react'
import barbervid from '../assets/barbervid.mp4'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../assets/logoCompleto.png';
import './About.css';
import { TbArrowBadgeDown } from "react-icons/tb";


function About() {
    return (
        <div className='contenedor'>
            <video className='video opacity-75 ' src={barbervid} muted loop autoPlay />
            <h2 className='centrado mt-3 opacity-100 mb-3 fs-1 '>¿A qué esperas?</h2>
            <Link to='/reservations' className='centro-en-video fs-1'>Pide cita ya!</Link>
            <h2 className='text-center fw-bold '>Los mejores cortes a tan solo un click</h2>
            <h2 className=' textillo text-center fs-3 '><TbArrowBadgeDown />Echa un vistazo a algunas de nuestras obras maestras.<TbArrowBadgeDown /></h2>
            

        </div>
        )
    }

export default About;
