import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContextProvider } from './providers/ContextProvider';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Asociaciones from './pages/Asociaciones';
import Eventos from './pages/Eventos';
import CrearAsociacion from './pages/CrearAsociacion';
import Login from './pages/Login';
import Asociacion from './pages/Asociacion';
import Logout from './pages/Logout';
import CrearEvento from './pages/CrearEvento';

function App() {

  // Ejemplo de fetch:
  // const { data, loading, error } = useFetch('https://rickandmortyapi.com/api/character');


  return (
    <Router>
      <div className="App">
        <ContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path='/' element={<Home />} />
              {/* <Route path="/Personaje/:id" element={<Personaje />} />
              <Route path="/BlogCharacters" element={<BlogCharacter />} /> */}
              <Route path='/crear_asociacion' element={<CrearAsociacion />} />
              <Route path='/asociaciones' element={<Asociaciones />} />
              <Route path='/asociaciones/:id' element={<Asociacion />} />
              <Route path='/crear_evento' element={<CrearEvento />} />
              <Route path='/eventos' element={<Eventos />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
            </Route>
          </Routes>
        </ContextProvider>
      </div>
    </Router>
  );
}

export default App;