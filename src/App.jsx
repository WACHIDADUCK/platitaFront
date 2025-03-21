import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContextProvider } from './providers/ContextProvider';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Asociaciones from './pages/Asociaciones';
import Eventos from './pages/Eventos/Eventos';
import CrearAsociacion from './pages/CrearAsociacion';
import Login from './pages/Login';
import Register from './pages/Register';
import Asociacion from './pages/Asociacion';
import Logout from './pages/Logout';
import Evento from './pages/Eventos/Evento';
import CrearEvento from './pages/Eventos/CrearEvento';
import CambiarEvento from './pages/Eventos/CambiarEvento';
import BorrarEvento from './pages/Eventos/BorrarEvento';
import BorrarAsociacion from './pages/BorrarAsociacion';
import EditarAsociacion from './pages/EditarAsociacion';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';

function App() {
  const user = JSON.parse(sessionStorage.getItem('user')) || {};

  return (
    <Router>
      <div className="App">
        <ContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/crear_asociacion' element={<CrearAsociacion />} />
              <Route path='/asociaciones' element={<Asociaciones />} />
              <Route path='/asociacion/:id' element={<Asociacion />} />
              <Route path='/asociacion/editar/:id' element={<EditarAsociacion />} />
              <Route path='/asociacion/borrar/:id' element={<BorrarAsociacion />} />
              <Route path='/crear_evento' element={<CrearEvento />} />
              <Route path='/cambiar_evento/:id' element={<CambiarEvento />} />
              <Route path='/borrar_evento/:id' element={<BorrarEvento />} />
              <Route path='/eventos' element={<Eventos />} />
              <Route path='/evento/:id' element={<Evento />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/logout' element={<Logout />} />
              {user.admin ? <Route path='/admin' element={<Admin />} /> : null}
              <Route path='/*' element={<NotFound />} />

            </Route >
          </Routes >
        </ContextProvider >
      </div >
    </Router >
  );
}

export default App;