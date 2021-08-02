import React, { useEffect, useState } from 'react'
import Navbar from '../ui/Navbar'
import Navbardos from '../ui/Navbardos'
import '../styles/Home.css'
import Axios from 'axios'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
const Home = () => {
  const [catA, setCatA] = useState([])
  const [catB, setCatB] = useState([])
  const [catC, setCatC] = useState([])
  const [concurso, setConcurso] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')
  const [horaFin, setHoraFin] = useState('')
  const [titulo, setTitulo] = useState('')
  const [fechaEncontrada, setfechaEncontrada] = useState('')
  const [horaencontrada, sethoraencontrada] = useState('')
  const [minEncontrado, setminEncontrado] = useState('')
  const [state, setstate] = useState(false)
  const History = useHistory();
  const request = async () =>{
    
    await Axios.get('http://localhost:4000/concurso/active').then(response=>{
      if(response.data.fechaFin != undefined){
        
        let fecha1 = moment(response.data.fechaFin+" "+response.data.horaFin ,"YYYY-MM-DD HH:mm:ss")
        let fecha2 = moment(new Date(),"YYYY-MM-DD HH:mm:ss")
        
        let diff = fecha2.diff(fecha1, 'd'); // Diff in days
        let diffdos = fecha2.diff(fecha1, 'h'); // Diff in hours   
        let horasRestantes = diffdos - (diff*24)
        let difftres = fecha1.diff(fecha2,'m');
        setminEncontrado(difftres%60)
  
        setConcurso(response.data)
        console.log(concurso)
        setCatA(response.data.categorias[0].cursos)
        setCatB(response.data.categorias[1].cursos)
        setCatC(response.data.categorias[2].cursos) 
        setTitulo(response.data.titulo)
        setFechaInicio(response.data.fechaInicio)
        setFechaFin(response.data.fechaFin)
        setHoraFin(response.data.horaFin)
        setfechaEncontrada(Math.abs(diff))
        sethoraencontrada(Math.abs(horasRestantes))
      }
      
    }).catch(error=>{
      console.error(error)
    })
  }
  useEffect(() => {
   request()
   window.watsonAssistantChatOptions = {
    integrationID: "cfd24d96-a2e8-45e5-b2d5-dbe23c0a194c", // The ID of this integration.
    region: "us-south", // The region your integration is hosted in.
    serviceInstanceID: "033f68c1-065a-461c-89ff-15ab5f398d14", // The ID of your service instance.
    onLoad: function(instance) { instance.render(); }
  };
setTimeout(function(){
  const t=document.createElement('script');
  t.src="https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
  document.head.appendChild(t);
});
  }, [])
    return (
        <div>
        <div className="separator-blue"></div>
        <Navbardos/>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="slider2-3.jpg" alt="First slide"/>    
      <div className="carousel-caption d-none d-md-block">
      <h1>CONCURSO DE PROYECTOS ESCUELA PROFESIONAL DE SISTEMAS</h1>
      <a className="btn btn-warning button-caruousel" href="#powtoon">COMO INSCRIBIRSE</a>
      </div>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="slider2-3.jpg" alt="Second slide"/>
      <div className="carousel-caption d-none d-md-block">
      <h1>CONCURSO DE PROYECTOS ESCUELA PROFESIONAL DE SISTEMAS</h1>
      <button className="btn btn-warning button-caruousel">COMO INSCRIBIRSE</button>
      </div>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="slider2-3.jpg" alt="Third slide"/>
      <div className="carousel-caption d-none d-md-block">
      <h1>CONCURSO DE PROYECTOS ESCUELA PROFESIONAL DE SISTEMAS</h1>
      <button className="btn btn-warning button-caruousel">COMO INSCRIBIRSE</button>
      </div>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
      <div className="home-date">
        <div className="home-img">
        <img src="homedate.jpg" style={{width:"374px",height:"217px"}}></img>
        </div>
        <div className="home-date-wrapper-details">
        <div className="home-date-details">
          <div className="home-date-event">
            <h5>Proximo evento</h5>
            <h4 style={{fontSize:"2rem",fontWeight:"bold"}}>{titulo}</h4> 
            <p>Auditorio de faing</p>
          </div>
          <div className="home-date-days">            
            <p style={{fontWeight:"bold",padding:"2%",backgroundColor:"#EBEBEB",fontSize:"2rem",margin:"0%"}}>{fechaFin.substr(8,10)}</p>
            <p style={{fontWeight:"bold",backgroundColor:"#EBEBEB",margin:"0%",padding:"2%"}}>{fechaFin.substr(5,2)}</p>
            <p style={{backgroundColor:"#DADADA",margin:"0%",padding:"2%"}}>{fechaFin.substr(0,4)}</p>
          </div>
        </div>
        <div className="home-exact-date">
          <div className="home-exact-date-date">                             
          
          <div><p style={{fontSize:"3rem",margin:"0%"}}>{fechaEncontrada}</p><p style={{margin:"0%"}}>Dias</p></div>
          <div><p style={{fontSize:"3rem",margin:"0%"}}>{horaencontrada}</p><p style={{margin:"0%"}}>Horas</p></div>
          <div><p style={{fontSize:"3rem",margin:"0%"}}>{minEncontrado}</p><p style={{margin:"0%"}}>Minutos</p></div>
          </div>
          <div className="home-exact-date-button"><button className="btn btn-warning btn-block home-btn" onClick={()=>{
            History.replace('/inscripcion')
          }}>UNETE AHORA</button></div>
        </div>
        </div>
      </div>
      <div className="participantes-wrapper container">
       
            <div className="participantes-title">
              <h3>Categorias del concurso de proyectos</h3>
              <br></br>
            </div>
            <div className="participantes-detail">
              <div className="card-wrapper">
              <div className="participanets-card">
                <div className="categoria-title">
                  <p>Categoria A</p>
                </div>
                <div className="categoria-body"> 
                  <p style={{fontWeight:"bold"}}>Primero al cuarto ciclo</p>
                  <div style={{fontWeight:"lighter"}}>
                    {
                      catA.map((c,i)=>{
                     return (<p key={i}>{c.descripcion}</p>)
                      })
                    }
                  </div>
                </div>  
              </div>
              <div className="participanets-card">
                <div className="categoria-title">
                  <p>Categoria B</p>
                </div>
                <div className="categoria-body"> 
                  <p style={{fontWeight:"bold"}}>Quinto al Séptimo ciclo</p>
                  <div style={{fontWeight:"lighter"}}>
                    {
                      catB.map((c,i)=>{
                        return (<p key={i}>{c.descripcion}</p>)
                      })
                    }
                  </div>
                </div>  
              </div>
              <div className="participanets-card">
                <div className="categoria-title">
                  <p>Categoria C</p>
                </div>
                <div className="categoria-body"> 
                  <p style={{fontWeight:"bold"}}>Octavo a Décimo ciclo</p>
                  <div style={{fontWeight:"lighter"}}>
                    {
                      catC.map((c,i)=>{
                        return (<p key={i}>{c.descripcion}</p>)
                      })
                    }
                  </div>
                </div>  
              </div>
              </div>
          
          </div>  
        </div>
        <div className="participantes-footer">
          <button className="btn btn-warning participantes-btn">REPOSITORIO DE PROYECTOS</button>
        </div>
        <div className="presentacion">
          <div className="wrapper-presentacion">
          <h2>Presentacion</h2>
          <p>La mejora continua de los procesos académicos requiere de recursos humanos con actitud que sepan enfrentar los cambios, con deseos de superación, ofrezcan un servicio de calidad en la formación académica y asuman nuevos retos.
La escuela de Ingeniería de Sistemas con el fin de asegurar la calidad académica en la formación profesional de nuestros estudiantes estamos realizando el proceso de Auto evaluación en mira a participar en un futuro proceso de acreditación de la carrera, de tal manera que sostengamos un posicionamiento competitivo y liderazgo a nivel sur del País </p>
          <button className="btn btn-warning presentacion-btn">MAS INFORMACION ...</button>
          </div>
        </div>
        <div className="powtoon container" style={{marginTop:"2rem"}} id="powtoon">
          <h2 className="text-warning" style={{marginBottom:"2rem"}}>Como inscribirse correctamente</h2>
          <div className="powtoon-video text-light display-4">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/n0A5qIwVGIg" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
        <div className="wrapper-vision">
            <div className="separator-blue"></div>
            <div className="vision">
              <h2>MISION DE LA UNIVERSIDAD PRIVADA DE TACNA</h2>
              <p style={{paddingTop:"2rem",fontSize:"2rem"}}>Somos una universidad sin fines de lucro socialmente responsable que forma profesionales competentes con sentido humanista que contribuyen al desarrollo sostenible de la sociedad
            </p>
            </div>
        </div>
        <div className="copy-footer container">
          <img src="uptnuevologo.png" ></img>
          <div className="copyright"></div>
          <div>
            <p style={{fontSize:"1.2rem",width:"80%",fontWeight:"bold"}}>All Rights Reserved. The contents of all material
             available on this Internet site are copyrighted </p>
          </div>
          <div className="redes-footer">
          <i className="fab fa-facebook-f" style={{fontSize:"2rem",marginRight:"5%"}}></i>
          <i className="fab fa-youtube" style={{fontSize:"2rem",marginRight:"5%"}}></i>
          </div>
        </div>
        <div className="separator-blue"></div>
        {/* <button className="btn btn-info" style={{position: 'fixed', top: '80%', right: 0}}
        onClick={()=>{
         
        }}
        
        >Hablar Con un Asistente</button> */}
      </div>
     
    )
}
export default Home;
