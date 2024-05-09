import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Equipo.css'
import Raul from '../assets/raul.jpeg'


function Equipo() {
return (
           <section className="d-flex flex-wrap justify-content-center gap-4 py-4">
                    <div className="position-relative">
                       <div className="position-absolute z-1 py-4 d-flex justify-content-center gap-2 w-100">
                              <p className="textos font-weight-bold text-white">Sierra</p>
                              <p>|</p>
                              <p className="textos font-weight-bold text-white">CM</p>
                              <p>|</p>
                              <Link className="textos textoLink" to="/team/sierra">Leer más</Link>
                       </div>
                       <img className="brightness-80" src="https://images.pexels.com/photos/6962024/pexels-photo-6962024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                    </div>
                    <div className="position-relative">
                    <div className="position-absolute z-1 py-4 d-flex justify-content-center gap-2 w-100">
                              <p className="textos font-weight-bold text-white ">Álex</p>
                              <p>|</p>
                              <p className="textos font-weight-bold text-white">Owner</p>
                              <p>|</p>
                              <Link className="textos textoLink" to="/team/billy">Leer más</Link>
                       </div>
                          <img className="brightness-80" src="https://images.pexels.com/photos/6475046/pexels-photo-6475046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                    </div>
                    <div className="position-relative">
                    <div className="position-absolute z-1 py-4 d-flex justify-content-center gap-2 w-100">
                              <p className="textos font-weight-bold text-white ">Raúl</p>
                              <p>|</p>
                              <p className="textos font-weight-bold text-white">Web Developer</p>
                              <p>|</p>
                              <Link className="textos textoLink" to="/team/raul">Leer más</Link>
                       </div>
                          <img className="brightness-80" src={Raul}></img>
                          
                    </div>
           </section>
)
}

export default Equipo