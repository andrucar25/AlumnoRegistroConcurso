import Axios from 'axios';
import React, { useEffect, useState } from 'react'



const SeachRepositorio = ({handleSubmit, setNombre, nombre}) => {
   
   
    return (

     <form onSubmit={handleSubmit}>
         <div className="d-flex">
            <input placeholder="Ingrese Nombre de Proyecto y presione Enter" className="form-control" value ={nombre}  onChange={e=>{setNombre(e.target.value)}} />
            <button className="btn btn-primary ml-1">TODOS</button>
            <button className="btn btn-primary ml-1"><i className="fas fa-sort-down"></i></button>
        </div>
            
     </form>
      
        
    )
}

export default SeachRepositorio
