import { useState } from "react";
import { api } from "../api/api";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {

    event.preventDefault();

    try {

      const response = await api.post(
        "/users/login",
        {
          email,
          password
        }
      );

      const user = response.data;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      alert("Login realizado com sucesso!");

      if (user.role === "ADMIN") {
        navigate("/admin/categories");
      } else {
        navigate("/home");
      }

    } catch (error) {

        console.error(error);

        alert("Email ou senha inválidos");

    }
  }

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>VivArte</h1>

        <form onSubmit={handleLogin}>

          <input
            className="login-input"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            className="login-input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            className="login-button"
            type="submit"
          >
            Entrar
          </button>

          <p>
            Não possui conta?{" "}
            <Link to="/register">
              Cadastre-se
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;