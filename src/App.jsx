import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContextProvider } from './providers/ContextProvider';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Asociaciones from './pages/Asociaciones';
import Eventos from './pages/Eventos';

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
              <Route path='/asociaciones' element={<Asociaciones />} />
              <Route path='/eventos' element={<Eventos />} />
            </Route>
          </Routes>
        </ContextProvider>
      </div>
    </Router>
  );
}

export default App;