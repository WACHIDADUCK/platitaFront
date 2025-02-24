import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../hooks/axios";

export default function Navbar() {

    const [busqueda, setBusqueda] = useState("");
    const [tipoBuesqueda, setTipoBusqueda] = useState("asociacion");


    function handleBusqueda() {
        console.log(busqueda, tipoBuesqueda);
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

    const comprobarSesion = async () => {
        const comprobar = await axios.get("/api/user");
        console.log(comprobar);
        return comprobar
    };

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
                {/* status: 200 */}

                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
    )
}