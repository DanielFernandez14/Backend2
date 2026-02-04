import { useState } from "react";
import { Layout } from "../components/Layout";
import { validatePassword } from "../validators/validatePassword";
import { login } from "../services/auth";

const Login = () => {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visibilityPass, setVisibilityPass] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // ✅ VALIDACIONES (similares a Register)
        setError(null);
        setMessage(null);

        const emailClean = email.trim();
        const passwordClean = password; // no trim para no cambiar contraseñas con espacios intencionales

        if (!emailClean || !passwordClean) {
            setError("Faltan datos: completá email y contraseña");
            return;
        }

        // ✅ EMAIL: formato básico correcto
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(emailClean)) {
            setError("Email inválido: formato incorrecto");
            return;
        }

        // ✅ PASSWORD: validación “segura” para login (no fuerza complejidad, solo sanity)
        if (passwordClean !== passwordClean.trim()) {
            setError("Contraseña inválida: tiene espacios al inicio o al final");
            return;
        }

        if (passwordClean.length < 8) {
            setError("Contraseña inválida: mínimo 8 caracteres");
            return;
        }

        if (passwordClean.length > 72) {
            setError("Contraseña inválida: máximo 72 caracteres");
            return;
        }

        // ✅ usando tu validatePassword (debe tener al menos 1 caracter especial)
        if (!validatePassword(passwordClean)) {
            setError("Contraseña inválida: falta un caracter especial");
            return;
        }

        try {
            const response = await login({ email, password })

            if (!response.ok) {
                setError("Credenciales invalidas")
                return
            }

            const data = await response.json()
            console.log(data)

            setEmail("");
            setPassword("");
            setMessage("Usuario logueado con éxito!")
        } catch (error) {

        }
    };

    return (
        <Layout>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Correo Electrónico: </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Contraseña: </label>
                <input
                    type={visibilityPass ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="button" onClick={() => setVisibilityPass(!visibilityPass)}>
                    Ver Contraseña
                </button>
                <button>Enviar</button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {message && <p style={{ color: "green" }}>{message}</p>}
            </form>
        </Layout>
    );
};

export { Login };
