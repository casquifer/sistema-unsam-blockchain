import { Link } from '@inertiajs/react';

const Header = ({ hideLogin = false }) => {
  return (
    <header className="welcome-header">
      <Link href="/">
        <img src="/img/Logo_UNSAM_blanco.png" alt="Logo" className="welcome-logo" />
      </Link>

      {!hideLogin && (
        <Link href="/login" className="login-btn">
          Iniciar sesión
        </Link>
      )}
    </header>
  );
};

export default Header;