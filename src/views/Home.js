import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import HomeBankImage from "../assets/images/HomeBank.jpg";
import HouseImage from "../assets/images/TuCasaPropia.jpg";
import LogoImage from "../assets/images/Logo.jpg";
import HipotecasImage from "../assets/images/Hipotecas.jpg";
import TarjetasCreditoImage from "../assets/images/TarjetasCredito.jpg";
import AperturaCuentaImage from "../assets/images/AperturaCuenta.jpg";
import TipoInteresImage from "../assets/images/TipoInteres.jpg";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-image">
          <img src={LogoImage} alt="Imagen descriptiva" className="logo-img" />
        </div>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/empresas">Empresas</Link>
            <ul className="dropdown">
              <li>
                <Link to="/opcion1">Opción 1</Link>
              </li>
              <li>
                <Link to="/opcion2">Opción 2</Link>
              </li>
              <li>
                <Link to="/opcion3">Opción 3</Link>
              </li>
              <li>
                <Link to="/opcion4">Opción 4</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/mi-banco">Mi Banco</Link>
            <ul className="dropdown">
              <li>
                <Link to="/opcion1">Opción 1</Link>
              </li>
              <li>
                <Link to="/opcion2">Opción 2</Link>
              </li>
              <li>
                <Link to="/opcion3">Opción 3</Link>
              </li>
              <li>
                <Link to="/opcion4">Opción 4</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/servicio-al-cliente">Servicio al Cliente</Link>
            <ul className="dropdown">
              <li>
                <Link to="/opcion1">Opción 1</Link>
              </li>
              <li>
                <Link to="/opcion2">Opción 2</Link>
              </li>
              <li>
                <Link to="/opcion3">Opción 3</Link>
              </li>
              <li>
                <Link to="/opcion4">Opción 4</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/abre-tu-cuenta">Abre tu Cuenta</Link>
            <ul className="dropdown">
              <li>
                <Link to="/opcion1">Opción 1</Link>
              </li>
              <li>
                <Link to="/opcion2">Opción 2</Link>
              </li>
              <li>
                <Link to="/opcion3">Opción 3</Link>
              </li>
              <li>
                <Link to="/opcion4">Opción 4</Link>
              </li>
            </ul>
          </li>
        </ul>

        <button className="btn-primary-nav">Banca Online</button>
      </nav>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="text-container">
            <h1>Banquito</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="header-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/login")}
              >
                Banca Personas
              </button>
              <button
                className="btn-primary"
                onClick={() => navigate("/loginEmpresa")}
              >
                Banca Empresas
              </button>
            </div>
          </div>
        </div>

        <div className="header-image">
          <img
            src={HomeBankImage}
            alt="Imagen descriptiva"
            className="header-img"
          />
        </div>
      </header>

      {/* Tarjetas */}
      <section className="cards">
        {/* Tarjeta 1 */}
        <div className="card">
          <div className="header-image">
            <img
              src={HipotecasImage}
              alt="Imagen descriptiva"
              className="header-img"
            />
          </div>
          <h3>Hipotecas</h3>
          <p>Encuentra la mejor hipoteca que se adapte a tus necesidades.</p>
          <button className="card-btn">Aprender más →</button>
        </div>

        {/* Tarjeta 2 */}
        <div className="card">
          <div className="header-image">
            <img
              src={AperturaCuentaImage}
              alt="Imagen descriptiva"
              className="header-img"
            />
          </div>
          <h3>Apertura Cuentas</h3>
          <p>Abre tu cuenta en minutos con procesos rápidos y sencillos.</p>
          <button className="card-btn">Aprender más →</button>
        </div>

        {/* Tarjeta 3 */}
        <div className="card">
          <div className="header-image">
            <img
              src={TarjetasCreditoImage}
              alt="Imagen descriptiva"
              className="header-img"
            />
          </div>
          <h3>Tarjetas de crédito</h3>
          <p>Descubre nuestras tarjetas con beneficios exclusivos.</p>
          <button className="card-btn">Aprender más →</button>
        </div>

        {/* Tarjeta 4 */}
        <div className="card">
          <div className="header-image">
            <img
              src={TipoInteresImage}
              alt="Imagen descriptiva"
              className="header-img"
            />
          </div>
          <h3>Tipos de Interés</h3>
          <p>Consulta los tipos de interés más competitivos del mercado.</p>
          <button className="card-btn">Aprender más →</button>
        </div>
      </section>

      {/* Sección destacada */}
      <section className="featured">
        <div className="featured-text">
          <h2>Tu casa propia</h2>
          <p>
            Infect itoard baroun, se noth as to que wild y thought a prepon they
            uprolipo lime mant.
          </p>
          <button className="btn-primary">Empecemos</button>
        </div>
        <div className="header-image">
          <img
            src={HouseImage}
            alt="Imagen descriptiva"
            className="header-img"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          {/* Logo */}
          <div className="logo-image">
            <img
              src={LogoImage}
              alt="Imagen descriptiva"
              className="logo-img-foot"
            />
          </div>

          {/* Subtítulos y Links */}
          <div className="footer-column">
            <h4>Contacto y ayuda</h4>
            <a href="#!">Enlace 1</a>
            <a href="#!">Enlace 2</a>
            <a href="#!">Enlace 3</a>
            <a href="#!">Enlace 4</a>
          </div>

          <div className="footer-column">
            <h4>Canales de atención</h4>
            <a href="#!">Enlace 1</a>
            <a href="#!">Enlace 2</a>
            <a href="#!">Enlace 3</a>
            <a href="#!">Enlace 4</a>
          </div>

          <div className="footer-column">
            <h4>Para tu interés</h4>
            <a href="#!">Enlace 1</a>
            <a href="#!">Enlace 2</a>
            <a href="#!">Enlace 3</a>
            <a href="#!">Enlace 4</a>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="social-icons">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-tiktok"></i>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
