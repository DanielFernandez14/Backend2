import { Routes, Route } from "react-router-dom"
import { Dashboard } from "../views/Dashboard"
import { Login } from "../views/Login"
import { Register } from "../views/Register"
import { Home } from "../views/Home"


const RouterApp = () => {
    return (
            <Routes>
                <Route path="/" element = { < Home /> }/>
                <Route path="/dashboard" element = { < Dashboard /> }/>
                <Route path="/login" element = { < Login /> }/>
                <Route path="/register" element = { < Register /> }/>
            </Routes>
    )   
}

export { RouterApp }