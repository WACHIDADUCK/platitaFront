import { Link } from "react-router-dom";
import { useState } from "react";


export default function Navbar() {

    const [busqueda, setBusqueda] = useState("");
    const [tipoBuesqueda, setTipoBusqueda] = useState("asociacion");


    function handleBusqueda() {
        switch (tipoBuesqueda) {
            case "asociacion":
                window.location.href = `/asociaciones?busqueda=${busqueda}`;
                break;
            case "evento":
                window.location.href = `/eventos?busqueda=${busqueda}`;
                break;
            default:
                window.location.href = `/`;
                break;
        }
    }


    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/" >
                    <img className="logo" src="/img/logo.png" alt="logo" />
                </Link>
            </div>

            <div className="navBarFiltro">
                <input onChange={(e) => setBusqueda(e.target.value)} type="text" name="nombre" alt='Buscador' placeholder="buscar" />
                <select onChange={(e) => setTipoBusqueda(e.target.value)} name="" id="">
                    <option value="asociacion">asociación</option>
                    <option value="evento">evento</option>
                </select>
                <Link onClick={handleBusqueda} className="botonAzul">buscar</Link>
            </div>

            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/asociaciones">Asociaciones</Link></li>
                <li><Link to="/eventos">Eventos</Link></li>
            </ul>
        </nav>
    )
}