import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../styles/Repositorio.css'
import Footer from '../ui/Footer'
import Navbar from '../ui/Navbar'

export const Proyecto = ({history}) => {
    const  {id } = useParams()
    console.log(id)

    const [proyectos, setProyecto] = useState([])
    const [path, setpath] = useState([])
    useEffect(() => {
        Axios.get(`http://localhost:4000/projectos/id/${id}`)
        .then( (response) => {
          // handle success
            
            setProyecto(response.data);
            setpath(response.data.path)
          console.log(response.data);
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })     
    }, [])

    
    return (
        <>
        <Navbar/>
        <div className="container">            
            <div className="wrapperRepo">
                <div className="wrapperUpt mt-5">
                    <img src="https://pbs.twimg.com/profile_images/1613248543/epis_400x400.png" style={{width:"50%"}}/>
                    <h1>EPIS REPOSITORIO</h1>
                </div>
                <div style={{width:"70%",marginTop:"10%",display:"flex",flexDirection:"column",marginBottom:"20%"}}>
                    <h1>{proyectos.nombreProyecto}</h1>
                    <h3>{proyectos.concurso}</h3>
                    <h4>{proyectos.categoria}</h4>
                    <br></br>
                    <div style={{display:"flex",justifyContent:"center",textAlign:"center"}} className="mb-4">
                        
                    {path.map(p=>{
                            return(
                                <a href={`http://localhost:8000/api/v1/archivos/archivo?path=${p}`} variant="contained"  className="btn btn-info"  style={{margin:'1em',width:'90%', backgroundColor:'#017ECA',color:'white', fontWeight:'bold',fontSize:"1.2rem" }}>{p.split('\\').pop().split('/').pop()}</a>
                            )
                        })
                            
                        }                
                    </div>
                    <Link to="/repositorio" className="btn btn-primary">Ver otros proyectos</Link>
                </div>
                
            </div>
        </div>
        <Footer/>
        </>
    )
}