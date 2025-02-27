
export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">
                <p> 2025 Aulaga. Todos los derechos reservados.</p>
                <div className="flexAlignCenter">
                    <img className="cc" src="/img/cc.png" alt="" />
                    <img className="wcag" src="/img/wcag.png" alt="" />
                </div>
                <ul className="footer__links">
                    <li><a href="#">Política de Privacidad</a></li>
                    <li><a href="#">Términos y Condiciones</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            </div>
        </footer>
    )
}