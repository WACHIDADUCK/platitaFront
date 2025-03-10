import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [login, setLogin] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [tipoBuesqueda, setTipoBusqueda] = useState("asociacion");
    const user = JSON.parse(sessionStorage.getItem('user')) || {};
    const navigate = useNavigate();
    //const idUser = user ? user.id : null;

    useEffect(() => {
        const idUser = user ? user.id : null;
        if (idUser) {
            setLogin(true);
        }
    }, []);


    function handleBusqueda() {
        switch (tipoBuesqueda) {
            case "asociacion":
                navigate(`/asociaciones?busqueda=${busqueda}`);
                break;
            case "evento":
                navigate(`/eventos?busqueda=${busqueda}`);
                break;
            default:
                navigate('/');
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
                {user.admin ? <li><Link to="/admin">Admin</Link></li> : null}
                <li><Link to="/asociaciones">Asociaciones</Link></li>
                <li><Link to="/eventos">Eventos</Link></li>
                {login ? (
                    <li><Link to="/logout">Logout</Link></li>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    )
}