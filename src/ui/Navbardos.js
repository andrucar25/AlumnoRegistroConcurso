import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbardos.css'
const Navbardos = () => {
    return (
        <div className="Menudos">
            <ul className="Menudos--ul">
                <li className="menudos--li">SOBRE NOSOTROS</li>
                <li className="menudos--li">PROYECTOS</li>                                
                <Link to="/repositorio" className="menudos--li" style={{textDecoration:"none"}}>REPOSITORIO</Link>
                <li className="menudos--li">UPT.PE</li>
            </ul>
        </div>
    )
}

export default Navbardos
