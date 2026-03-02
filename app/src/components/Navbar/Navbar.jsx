import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.navbar}>
        {/* Lado Esquerdo: Logo ou Iniciais */}
        <div className={style.logo}>
          Nós ❤️ {/* Pode colocar as iniciais de vocês aqui, ex: J & M */}
        </div>
        
        {/* Lado Direito: Links de Navegação */}
        <div className={style.navLinks}>
          <NavLink 
            to="/initialPage" 
            className={({ isActive }) => (isActive ? `${style.link} ${style.activeLink}` : style.link)}
          >
            Inicio
          </NavLink>
          <NavLink 
            to="/fotos" 
            className={({ isActive }) => (isActive ? `${style.link} ${style.activeLink}` : style.link)}
          >
            Fotos
          </NavLink>

          <NavLink 
            to="/posts" 
            className={({ isActive }) => (isActive ? `${style.link} ${style.activeLink}` : style.link)}
          >
            Posts
          </NavLink>

          <NavLink 
            to="/motivos" 
            className={({ isActive }) => (isActive ? `${style.link} ${style.activeLink}` : style.link)}
          >
            Motivos
          </NavLink>
        </div>

    </nav>
  )
}

export default Navbar;