import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Layout = ({ children }) => {
  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const handleClick = ( ) => {
    logout()
    navigate("/login")
  }


  return (
    <>
      <header>
        <nav>
          {!user && (
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Registro</Link></li>
            </ul>
          )}

          {user && (
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li>
                <button onClick={handleClick}>
                  Cerrar sesión
                </button>

              </li>
            </ul>
          )}
        </nav>
      </header>

      <main>{children}</main>

      <footer>
        <p>Sitio desarrollado por DanoDev</p>
      </footer>
    </>
  )
}


export { Layout }