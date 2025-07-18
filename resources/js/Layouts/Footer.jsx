import { Link } from '@inertiajs/react';

const Footer = () => {
    return (
      <footer className="footer-container">
        <a href="https://unsam.edu.ar/" target="_blank" rel="noopener noreferrer">
          <img src="/img/Logo_UNSAM_blanco.png" alt="Logo Izquierda" className="footer-logo" />
        </a>

  
        <span className="footer-text">© {new Date().getFullYear()} Universidad Nacional de San Martín. Todos los derechos reservados.</span>
  
        <a href="https://cidi.unsam.edu.ar/" target="_blank" rel="noopener noreferrer">
          <img src="/img/Logo_CIDI_blanco.png" alt="Logo Derecha" className="footer-logo" />
        </a>

      </footer>
    );
  };
  
  export default Footer;
  