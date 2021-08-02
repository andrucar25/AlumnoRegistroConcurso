import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import Aea from './pages/Aea';
import {Enviado} from './pages/Enviado';
import {Inscripcion} from './pages/Inscripcion';
import {Proyecto} from './pages/Proyecto';
import {Repositorio} from './pages/Repositorio';
import Home from './pages/Home'
const ModuleInscripcion = () => {
    window.document.title="Concurso de Proyectos"
    return (
        <div>
            <Router>
                <Switch>                    
                    <Route path="/inscripcion" component={Inscripcion}></Route>
                    <Route path="/enviado" component={Enviado}></Route>
                    <Route path="/repositorio" component={Repositorio}></Route>
                    <Route path="/proyecto/:id" component={Proyecto}></Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                    <Route path="/swal">
                        <Aea/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
export default ModuleInscripcion