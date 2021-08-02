import React, { useEffect, useState } from 'react'
import axios from 'axios'
export const Enviado = ({history}) => {
    const [codigo, setCodigo] = useState('')
    const [nombre, setNombre] = useState('')
    useEffect(() => {        
        if(window.token==null){
            console.log(window.token)
            history.replace("/inscripcion");
        }
        const config = {
            headers: { Authorization: `Bearer ${window.token}` }
        };
        
        
        axios.get( 
          'http://localhost:4000/auth/profile',
          config
        ).then(result=>{
            console.log(result.data)
            setCodigo(result.data.codigo)
            setNombre(result.data.nombres+' '+result.data.apellidos)
        }).catch(console.log);
        return () => {            
            window.token = ''
        }
    }, [])
    return (
        <div className="container text-center">
            <h1>El archivo fue enviado correctamente</h1>            
            <h2 className="m-3 mb-5" style={{fontSize:"2rem",fontWeight:"bold"}}>Alumno responsable</h2>
            <h2 style={{fontSize:"2rem",fontWeight:"bold"}}>Codigo :</h2><span style={{fontSize:"2rem"}}> {codigo}</span>
            <h2 style={{fontSize:"2rem",fontWeight:"bold"}}>Nombre :</h2><span style={{fontSize:"2rem"}}> {nombre}</span>
            <br></br>
            <i className="fas fa-check-circle display-1 text-success mt-5"></i>
        </div>
    )
}
