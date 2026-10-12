import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  async function handleRegister(event) {

    event.preventDefault();

    try {

      await api.post("/users", {
        name,
        email,
        password,
        phone,
        role: "CLIENT"
      });

      alert("Conta criada com sucesso!");

      navigate("/");

    } catch (error) {

      console.error(error);

      alert("Erro ao criar conta");
    }
  }

  return (
    <div className="register-container">

      <div className="register-card">

        <h1>Cadastro</h1>

        <form onSubmit={handleRegister}>

          <input
            className="register-input"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            className="register-input"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            className="register-input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <input
            className="register-input"
            type="text"
            placeholder="Telefone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <button
            className="register-button"
            type="submit"
          >
            Criar Conta
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;