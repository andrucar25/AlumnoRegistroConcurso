import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/CardRepositorio.css'
const CardRepositorio = ({nombreProyecto,categoria,estudiantes,proyecto,_id,concurso}) => {
    
    
   
    return (
        <div className="wrapperCardRepositorio">
            <div className="wrapperCardTitle">
                <h3>{nombreProyecto}</h3>
                <Link to={`proyecto/${_id}`} className="btn btn-primary ButtonCard" style={{fontSize:"1.5rem",height:"3.5rem"}}>Ver</Link>    
            </div>
            <div className="wrapperCardBody">
                <p>{categoria}</p>
                <div className="wrapperCardDetail">
                    <div className="wrapperCardFooter">
                            {estudiantes.map(e=>{                                
                            return (<p key={e.codigo}>{e.nombres},{e.apellidos};</p>)
                            })}
                    </div>
                    <p>{proyecto}</p>
                    <p>{concurso}</p>
                </div>
            </div>
        </div>
    )
}

export default CardRepositorio
