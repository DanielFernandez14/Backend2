import { useState } from "react";
import { Layout } from "../components/Layout"
import "../styles/Register.css";



const Register = () => {

    const [username, setUsername ] = useState("")
    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")
    const [error, setError] = useState("")
    const [ message, setMessage ] = useState("")
    const [showPassword, setShowPassword] = useState(false)



const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // ✅ Normalización mínima (sin cambiar tu state)
    const usernameClean = username.trim();
    const emailClean = email.trim();
    const passwordClean = password;

    if (!usernameClean || !emailClean || !passwordClean) {
        setError("Necesitas rellenar todos los campos");
        return;
    }

    // ✅ USERNAME: 3-20, letras/números/._-, sin espacios
    // (ajustable)
    const usernameRegex = /^[a-zA-Z0-9._-]{3,20}$/;
    if (!usernameRegex.test(usernameClean)) {
        setError("Usuario inválido: 3-20 caracteres, sin espacios (letras, números, . _ -)");
        return;
    }

    // ✅ EMAIL: formato básico correcto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(emailClean)) {
        setError("Email inválido");
        return;
    }

    // ✅ PASSWORD: mínimo 8, 1 mayúscula, 1 minúscula, 1 número, 1 símbolo
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(passwordClean)) {
        setError("Contraseña débil: mínimo 8, mayúscula, minúscula, número y símbolo");
        return;
    }

    // ✅ (Opcional) Evitar passwords comunes
    const commonPasswords = ["12345678", "password", "qwerty123", "123456789"];
    if (commonPasswords.includes(passwordClean.toLowerCase())) {
        setError("Contraseña demasiado común");
        return;
    }

    // ✅ Mantengo tu objeto (pero usando los valores limpios)
    const newDataUser = { username: usernameClean, email: emailClean, password: passwordClean };

    try {
        const response = await fetch("http://localhost:1234/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newDataUser)
        });

        const data = await response.json();

        if (!response.ok) {
            setError(data.message || "Usuario ya existente...");
        } else {
            setMessage("Usuario creado con éxito");
            setUsername("");
            setEmail("");
            setPassword("");
        }
    } catch (error) {
        setPassword("");

        if (error instanceof TypeError && error.message === "Failed to fetch") {
            setError("Conexión del backend perdidda");
        } else {
            setError("Ocurrió un error inesperado");
        }
    }
};



    //mostrar contraseña 
        const handleVisibilityPassword = () =>  {
            setShowPassword(!showPassword)
        }
        

    return (
        <Layout>
            <h1>Registrate</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Nombre de Usuario</label>
                <input type="text" id="username" value={username} autoComplete="off" onChange={(e) => setUsername(e.target.value)}/>

                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password">Contraseña</label>
                <input 
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}/>
                <button type="button" onClick={handleVisibilityPassword}> Ver Constraseña</button>
                <button type="submit">Enviar</button>
                {error && <p>{error}</p>}
                {message && <p style={{color: "green"}}>{message}</p>}
            </form>

        </Layout>
    )
} 
export { Register }