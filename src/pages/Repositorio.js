import React, { useEffect, useRef, useState } from 'react'
import SeachRepositorio from '../components/SeachRepositorio'
import Navbar from '../ui/Navbar'
import Footer from '../ui/Footer'
import '../styles/Repositorio.css'
import CardRepositorio from '../components/CardRepositorio'
import Axios from 'axios'

export const Repositorio = () => {

    const [proyectos, setProyecto] = useState([])
    const isMounted = useRef(true)

    const [nombre, setNombre] = useState("")

      //Peticion Buscar Proyectos accionado con enter
    const handleSubmit = (e) =>{
        e.preventDefault();
        setProyecto([]);

        Axios.get(`http://localhost:4000/projectos/${nombre}`)
            .then(function (response) {
              // handle success
              for(const value of response.data){
                setProyecto(p=>[value,...p])
              }
              console.log(response);
              
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
    }

 

    //Peticion Listar Proyectos
    useEffect(() => {
        if(isMounted.current){

            Axios.get('http://localhost:4000/projectos/historicos')
            .then(function (response) {
              // handle success
              for(const value of response.data){
                setProyecto(p=>[value,...p])
              }
              console.log(response);
              
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            return () => {
               isMounted.current = false;
               setProyecto([]);
            }

        }
       
    }, [])

/*
   
    return (
        <>
        <Navbar/>
        <div className="container">            
            <div className="wrapperRepo">
                <div className="wrapperUpt mt-5">
                    <img src="epis.jpeg"/>
                    <h1>EPIS REPOSITORIO</h1>
                </div>
                <div style={{width:"70%",marginTop:"10%",display:"flex",flexDirection:"column"}}>
                    <div className="wrapperSearch"> 
                        <h3 className="badgeProyecto"><span>Proyectos</span> <span className="badgeNumber">{proyectos.length}</span></h3>
                        
                        <SeachRepositorio handleSubmit={handleSubmit} setNombre={setNombre}  nombre={nombre}/>
                    </div>
                    {
                        proyectos.map(p=>{
                            return (<CardRepositorio {...p} key={p.nombreProyecto}/>)
                        })
                    }       
                    <div className="text-center mt-4">
                        <button className="btn btn-primary text-light">Anterior</button>
                        <button className="btn btn-primary text-light">Siguiente</button>
                    </div>         
                </div>
                
            </div>
        </div>
        <Footer/>
        </>
    )
}
*/
return (
    <>
    <Navbar/>
    <div className="container">            
        <div className="wrapperRepo">
            <div className="wrapperUpt mt-5">
                <img src="epis.jpeg"/>
                <h1>EPIS REPOSITORIO</h1>
            </div>
            <div style={{width:"70%",marginTop:"10%",display:"flex",flexDirection:"column"}}>
                <div className="wrapperSearch"> 
                    <h3 className="badgeProyecto"><span>Proyectos</span> <span className="badgeNumber">{proyectos.length}</span></h3>
                    <SeachRepositorio handleSubmit={handleSubmit} setNombre={setNombre}  nombre={nombre}/>
                </div>
                {
                    proyectos.map((p,i)=>{
                        return (<CardRepositorio {...p} key={i} />)
                    })
                }       
                <div className="text-center mt-4">
                    <button className="btn btn-primary text-light">Anterior</button>
                    <button className="btn btn-primary text-light">Siguiente</button>
                </div>         
            </div>
            
        </div>
    </div>
    
    </>
)
}