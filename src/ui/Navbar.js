import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
const Navbar = () => {
    return (
        <div>
            <div className="header">
            <p className="font"><i className="far fa-envelope p-2 iconi"></i>info@gmail.com</p>
                     <div>
                     <Link className="nav-item-header" to="/">                            
                            Home
                        </Link>
                        <Link className="nav-item-header" to="/inscripcion">                            
                            Inscripcion
                        </Link>
                        <Link className="nav-item-header button-decorator" to="/repositorio">                            
                            Repositorios
                        </Link>
                    </div>
            </div>
        </div>
    )
}

export default Navbar
