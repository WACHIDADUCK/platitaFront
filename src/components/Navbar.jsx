import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/" >
                    <img className="logo" src="/img/logo.png" alt="logo" />
                </Link>
            </div>

            <div className="search-bar">
                <input type="text" placeholder="Buscar..."></input>
                <button type="submit">🔍</button>
            </div>

            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/asociaciones">Asociaciones</Link></li>
                <li><Link to="/eventos">Eventos</Link></li>
            </ul>
        </nav>
    )
}