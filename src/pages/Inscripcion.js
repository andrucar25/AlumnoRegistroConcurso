import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../ui/Navbar'
import '../styles/Inscripcion.css'
import Footer from '../ui/Footer'
import axios from 'axios'
//import swal from 'sweetalert'
import swal from 'sweetalert';
import Modal from 'react-modal'

export const Inscripcion = ({history}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [files, setFiles] = useState([])
    //
    const [ciclo, setCiclo] = useState([])
    const [curso, setCurso] = useState([])
    const [proyecto, setProyecto] = useState()
    //
    const [nombreProyecto, setNombreProyecto] = useState('')
    const [nombreGrupo, setNombreGrupo] = useState('')
    const [cicloSelected, setCicloSelected] = useState('')
    const [cursoSelected, setCursoSelected] = useState('')
    //
    const [codigo, setCodigo] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [celular, setCelular] = useState('')
    const [correo, setCorreo] = useState('')
    //
    const [users,setUsers] = useState([])
    const [structure, setStructure] = useState(false)
    const [github, setGithub] = useState('')
    const [codigoForm, setCodigoForm] = useState('')
    const [password, setPassword] = useState('')
    const [path,setPath]= useState('')
    //RESPONSE PYTHON
    const [responsePy,SetResponsePy] = useState([])
    //LOADING
    const [isloading,SetIsLoading] = useState(false)
    //
    //TODO
    const [idConcursoActivo, setIdConcursoActivo] = useState('')
    const [nombreConcurso, setNombreConcurso] = useState('')
    const [cursosCategorias, setCursosCategorias] = useState([])    
    //
    const [categoria, setcategoria] = useState('')
    //
    const isMounted = useRef(true)
    const procesar = async (codigoAlumno) =>{
        console.log(files)        
        const formData = new FormData();
        for (const file of files){
            formData.append("files",file)
        }
        
        //formData.append("nameProject",nombreProyecto)
        fetch(`http://localhost:8000/api/v1/documentos/subir?nombre_proyecto=${nombreProyecto}&categoria=${"Categoria C"}`, {
                    method: 'POST',
                    body: formData,
                 
                })
                .then(response => response.json())
                .then((data) => {
                    console.log(data)
                    if(data.detail){
                        swal("Debe subir algun archivo para analizar")
                    }
                    if(data.message){
                        setFiles([])
                        const message = data.message
                        swal(message)
                    }
                    if(data.response){
                        // setStructure(data.response)
                        console.log(data.response)
                        console.log(data)
                        setPath(data.paths)
                        const cursoDocente = cursoSelected.split(",")
                        console.log(cursoDocente)
                        if(data.paths!=""){
                            
                               axios.post('http://localhost:4000/projectos', {
                                idConcurso:idConcursoActivo,
                                nombreConcurso:nombreConcurso,
                                nombreProyecto:nombreProyecto,
                                nombreGrupo:nombreGrupo,
                                encargado:codigoAlumno,
                                ciclo:cicloSelected,
                                curso:cursoDocente[0],
                                docente:cursoDocente[1],
                                estudiantes:users,
                                categoria:categoria,
                                estado:false,
                                path:data.paths,
                                github:github,
                                concurso:"Concurso de Proyectos 2020 - II"
                              })
                              .then( (response)=> {
                                console.log(response.data._id);
                                fetch(`http://localhost:8000/api/v1/plagios/analizar?id_proyecto=${response.data._id}`, {
                                    headers: {
                                        Accept: "application/json"
                                    },
                                    method: "POST"
                                    })
                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                        }
                    }
                    console.log(proyecto)
                    
                })
                .catch(error => {                    
                    console.error(error)
                })
    }
    const HandleMongo = async () =>{
       await procesar()
    //    await axios.post('http://localhost:4000/projectos', {
    //     proyecto
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    }
    useEffect(async() => {        
        if(isMounted.current){

            const request = await fetch('http://localhost:4000/ciclos')
            console.log(request)
            const data = await request.json()
            console.log(data)
            for (const ciclo of data){
                console.log(ciclo)
                setCiclo(c=>[ciclo,...c])
            } 
            console.log(ciclo)
            //////ESTE ES EL CONCURSO
            const requestConcurso = await fetch('http://localhost:4000/concurso/active')
            console.log(requestConcurso)
            const dataConcurso = await requestConcurso.json()
            setIdConcursoActivo(dataConcurso._id)
            setNombreConcurso(dataConcurso.titulo)
            for (const cursosCategory of dataConcurso.categorias){
                console.log(cursosCategory)
                setCursosCategorias(c=>[...cursosCategory.cursos,...c])
            }
            console.log(dataConcurso)
            console.log(cursosCategorias)
            /////
            isMounted.current=false  
        }        
        return () => {
            setCiclo([])
            isMounted.current=false   
        }
    }, [])
    const Auth= async (e) =>{
        e.preventDefault()
        console.log("Auth")
        console.log(codigoForm,password)
        await axios.post('http://localhost:4000/auth/login',{codigo:codigoForm,contrasenia:password}).then(res=>{
            console.log(res.data)
            if(res.data.access_token){
                    procesar(codigoForm)

                    console.log("Redirige ps")
                    window.token = res.data.access_token
                    history.push("/enviado");                        
            }
        })
    }
   const handleCategoria = (ciclo) => {
        const catA ="Categoria A"
        const catB ="Categoria B"
        const catC ="Categoria C"
        switch (ciclo) {
            case 'I':
                setcategoria(catA)
                break;
            case 'II':
                setcategoria(catA)
                break;
            case 'III':
                setcategoria(catA)
                break;
            case 'IV':
                setcategoria(catA)
                break;
            case 'V':
                setcategoria(catB)
                break;            
            case 'VI':
                setcategoria(catB)
                break;
            case 'VII':
                setcategoria(catB)
                break; 
            case 'VIII':
                setcategoria(catC)
                break;            
            case 'IX':
                setcategoria(catC)
                break;
            case 'X':
                setcategoria(catC)
                break; 
            default:
                break;
        }        
   }
   const handleCiclo = async (e) =>{
        console.log(cursosCategorias)
        console.log(e.target.value)
        setCicloSelected(e.target.value)
        const ciclo = e.target.value
        handleCategoria(ciclo)
        //const data = await fetch(`http://localhost:4000/cursos/${ciclo}`)
        //const cursos = await data.json()
        const cursos = cursosCategorias.filter(cur => cur.ciclo == ciclo)
        console.log(cursos)        
        setCurso(cursos)
   }
    const handleCurso= e =>{
        setCursoSelected(e.target.value)
    }
    const HandleFile = (e) => {
        e.preventDefault()
        setFiles([])
        for (const file of e.target.files){
            setFiles(f=>[file,...f])            
        }
        console.log(files)
    }
    const handleUser = e =>{
        e.preventDefault()
        const findUser= users.find(u=>u.codigo==codigo)
        if(findUser){
            swal("Codigo repetido")            
        }else{
            if(users.length <= 3){            
                setUsers(users=>[{
                    codigo:codigo,
                    nombres:nombres,
                    apellidos:apellidos,
                    correo:correo,
                    celular:celular
                },...users])
                setCodigo('')
                setNombres('')
                setApellidos('')
                setCorreo('')
                setCelular('')
            }else{
                swal("El numero maximo de integrantes es de 4");
            }
        }
        
    }
    const HandleEnter = async (e) => {     
        if(e.key === 'Enter'){
            console.log("Este es un enter")
            console.log(codigo)
            await axios.get(`http://localhost:4000/estudiantes/${codigo}`).then(({data})=>{
                console.log(data)                
                if(data){
                    if(users.length <= 3){
                        setNombres(data.nombres+' '+data.apellidos)
                        setCorreo(data.correo)
                        setCelular(data.celular)
                        setUsers(users=>[{
                            codigo:data.codigo,
                            nombres:data.nombres,
                            apellidos:data.apellidos,
                            correo:data.correo,
                            celular:data.celular
                        },...users])
                    console.log("Entro al array")
                    }else{
                        swal("El numero maximo de integrantes es de 4");
                    }
                }else{
                    swal("El codigo no existe")
                }
                
                
            }).catch(error=>{
                console.log(error)
            })
            console.log(users)
        }
        
    }
    const  UploadFile = e =>{
            e.preventDefault()
            SetIsLoading(true)
            SetResponsePy([])
            console.log(files)
           
            const formData = new FormData();
            for (const file of files){
                formData.append("files",file)
            }
            // formData.append("nameProject",nombreProyecto)
           // formData.append("nameProject","nombreProyecto")
            fetch(`http://localhost:8000/api/v1/documentos/analizar?nombre=${nombreGrupo}`, {
                        method: 'POST',
                        body: formData,
                     
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        if(data.detail){
                            swal("Debe subir algun archivo para analizar")
                        }
                        if(!Array.isArray(data.message) && !data.estado){
                            setFiles([])
                            const message = data.message
                            swal(message)
                        }
                        if(Array.isArray(data.message) && !data.estado){
                            console.log(data.estado)
                            SetResponsePy(c=>[data.message,...c]) 
                        }
                        if(data.estado){
                            // setStructure(data.response)
                            console.log(data.estado)
                            SetResponsePy(c=>[data.message,...c])                           
                            setStructure(true)
                        }
                        SetIsLoading(false)
                        
                    })
                    .catch(error => {
                        console.error(error)
                    })
            
        }
        
    Modal.setAppElement("#root")
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
      const closeModal=()=>{
          setModalIsOpen(false)
      }
        return (
        <div>
            <Navbar></Navbar>
        <Modal
          isOpen={modalIsOpen}         
          style={customStyles} 
          onRequestClose={closeModal}
          contentLabel="Login"
        >
          <form onSubmit={Auth}>
  <div className="form-group row">
    <label htmlFor="staticEmail" className="col-sm-2 col-form-label mr-2">codigo</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="staticEmail" required onChange={e=>{
          setCodigoForm(e.target.value)
      }}/>
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label mr-2">Password</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" id="inputPassword" required maxLength="100" onChange={e=>{
          setPassword(e.target.value)
      }}/>
    </div>
  </div>
  <button type="submit" className="btn btn-block btn-primary">Autenticar</button>
</form>
        </Modal>
          
            <div className="container">
            <div>
                <h1>Inscribirse al concurso de proyectos</h1>
                <p>La Escuela Profesional de Ingeniería en Sistemas de la Facultad de Ingeniería de la
Universidad Privada de Tacna, invita a todos los estudiantes de la EPIS a inscribirse al Concurso de Proyectos que realiza la escuela cada ciclo.
La finalidad es fomentar la investigación y la generación de nuevas ideas mediante la elaboración de proyectos desarrollados en los
diferentes cursos de la carrera que den solución a problemas de la realidad empresarial y social.</p>
                <br></br>
                <hr/>
                <h3>Bases del concurso</h3>
                <div className="d-flex align-items-baseline">
                <p>Recuerda seguir las reglas del concurso de proyecto</p>
                <a href="http://epis.upt.edu.pe/acreditacion/index.php/inicio/concursoproyectos" target="_blank"><i className="far fa-file-word iconi pl-5"></i></a>
                </div>
            </div>
            <div>
                <h2>Informacion del proyecto</h2>
                <div>                   
                    <div className="form-group">    
                        <input 
                        type="text" 
                        className="form-control"
                        placeholder="Nombre del proyecto"
                        onChange={e=>{
                            setNombreProyecto(e.target.value)
                        }}
                        maxLength="100"
                        />
                    </div>
                    <div className="form-group">    
                        <input 
                        type="text" 
                        className="form-control"
                        placeholder="Nombre del grupo"
                        onChange={e=>{
                            setNombreGrupo(e.target.value)
                        }}
                        maxLength="100"
                        />
                    </div>
                    <div className="form-group">    
                       <div className="d-flex ">
                        <select className="form-control shrink" onClick={handleCiclo}>
                            {
                                ciclo.map(c=>{
                                    return (
                                    <option value={c.descripcion} key={c.descripcion}>{c.descripcion}</option>
                                )                                    
                                })
                            }
                                                        
                        </select>
                        <select className="form-control shrink" onClick={handleCurso}>
                            {
                                curso.map(c=>{
                                    return(
                                    <option value={c.descripcion+","+c.docente} key={c.codigo}>{c.descripcion}</option>
                                    )
                                })
                            }
                        </select>   
                       </div>       
                       <br></br>
                       <hr/>     
                    </div>
                </div>
                <div>
                    <div className="mb-5">
                        <h2>Informacion de los estudiantes</h2>                        
                    </div>                                                                
                    <form onSubmit={handleUser} className="d-flex wrap">
                    <input 
                        type="text" 
                        className="form-control input30"
                        placeholder="Codigo"                        
                        value={codigo}
                        onChange={e=>{
                            setCodigo(e.target.value)
                        }} required
                        maxLength="10"/>
                    <input 
                        type="text" 
                        className="form-control input30"
                        placeholder="Nombres"
                        value={nombres}
                        onChange={e=>{
                            setNombres(e.target.value)
                        }} required
                        maxLength="70"
                        />
                    
                        <input 
                        type="text" 
                        className="form-control input30"
                        placeholder="Apellidos"
                        value={apellidos}
                        onChange={e=>{
                            setApellidos(e.target.value)
                        }} required
                        maxLength="70"
                        />
                        <input 
                        type="text" 
                        className="form-control input30"
                        placeholder="Celular"
                        value={celular}
                        onChange={e=>{
                            setCelular(e.target.value)
                        }} required
                        maxLength="12"/>
                        <input 
                        type="text" 
                        className="form-control input30"
                        placeholder="Correo"
                        value={correo}
                        onChange={e=>{
                            setCorreo(e.target.value)
                        }} required
                        maxLength="45"/>
                        <button type="submit" className="btn btn-primary" style={{width:"18%",height:"3rem"}}>Agregar</button>
                        </form>
                    
                    <p>Numero de integrantes : {users.length}</p>
                    <div className="d-flex wrap">
                    {users.map(u=>{
                        return (
                            <div className="d-flex w30" key={u.codigo}>
                        <img src="boy.png" className="img-thumbnail mr-2 " style={{width:"30%",height:"80px"}}></img>
                        <div className="d-flex flex-column" style={{width:"50%"}}>
                        <p>{u.nombres}</p>
                        <p>{u.correo}</p>
                            <button className="btn btn-danger">Eliminar</button>
                        </div>
                    </div>
                        )
                    })}
                    </div>
                    <br></br>                   
                    <hr/>    
                </div>
                
                <div>
                
                    <h2>Subir documentacion del proyecto</h2>
                    
                    <div className="d-flex justify-content-between">
                        
                        <p className="wd50">
                        Recuerda leer las bases del concurso de proyectos actualizada, donde encontrarás los anexos que deberás subir para la inscripción, asi como detalles respecto al concurso.
                        </p>
                        <div>                        
                        <form onSubmit={UploadFile}>
                        <input type="file" name="files" id="files" multiple onChange={HandleFile} hidden></input>
                        <label htmlFor="files" id="selector" className="label">
                            {
                            files.length!=0
                            ?files.map(f=>                            
                            (isloading ? <img src="loading.gif" width="50px" height="50px"/> : <span className="active" key={f.name}>{f.name}</span>)
                            )
                            :<i className="fas fa-cloud-upload-alt icono"></i>
                            }
                        </label>                        
                        <button type="submit" className="btn btn-primary btn-block">Procesar</button>
                        </form>
                        
                        </div>
                    </div>
                   <div className="text-left mt-4" style={{ backgroundColor: "#1f4662",color: "#fff", fontSize: "1.5rem" }}>
                        <pre style={{ color:"white",display: 'block', padding: '10px 30px', margin: '0', overflow: 'scroll', }}>{JSON.stringify(responsePy,null,4).replace(/["{[,\}\]]/g, "")}</pre>
                   </div>
                </div>
                {
                   structure?
                    (
                       <div>                      
                <hr/>
                <div>
                    <h3 className="mb-4">Listo para enviar los documentos !!!</h3>
                    <p className="mb-4">
                    En este apartado deberás subir los anexos correspondientes de la inscripción para comprobar que la estructura de la misma sea la correcta. Si todo está bien podrás
subir el enlace a tu repositorio github del proyecto, caso contrario deberás completar correctamente los anexos hasta que el sistema los apruebe.
                    </p>
                    {/* <pre>{proyecto}</pre> */}
                    <input 
                        type="text" 
                        className="form-control mb-4"
                        placeholder="Repositorio de github"
                        onChange={e=>{
                            setGithub(e.target.value)
                        }}
                        maxLength="200"
                        />
                    <button onClick={HandleMongo} hidden>EnviarFalso</button>
                    <button className="btn btn-primary btn-block" onClick={()=>{
                        setModalIsOpen(true)
                    }}>Enviar</button>
                    
                </div>
                       </div>
                   ):(<div>
                          <div className="displayterm">
                        <br></br>
                        <p className="logger " hidden><span className="logger-font">&rsaquo;</span>Ahora que tus anexos están correctos, ingresa el enlace a tu repositorio github de tu proyecto y luego, para completar la inscripción haz click en el botón <strong>Enviar</strong>para autenticar al encargado del proyecto, el cual será notificado cuando la encargada acepte o rechaze la inscripción.</p>
                        <br></br>
                    </div>
                   </div>)

                }
                
            </div>
            
            </div>
            <div className="mt-5" style={{backgroundColor: "#0A245F"}}>
            <div className="p-4 d-flex justify-content-around text-light">   
            <div>
            <i className="fab fa-facebook iconi pr-3"></i>
            <i className="fab fa-youtube iconi pr-3"></i>
            </div>
            </div>
        </div>
        </div>
    )
}
