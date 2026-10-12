import { useState } from "react";
import axios from "axios";

import "./AdminCategory.css";
import AdminMenu from "./AdminMenu.jsx";

function AdminCategory() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(event) {

    event.preventDefault();

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        `http://localhost:8080/categories?userId=${user.id}`,
        {
          name,
          description
        }
      );

      alert("Categoria criada com sucesso!");

      setName("");
      setDescription("");

    } catch (error) {

      console.error(error);

      alert("Erro ao criar categoria");
    }
  }

  return (
    <div>
      <AdminMenu />

      <div className="category-container">

        <div className="category-card">

          <>
            <h1>Cadastrar Categoria</h1>

            <p className="category-subtitle">
              Organize os produtos da VivArte em categorias.
            </p>
          </>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <button type="submit">
              Salvar Categoria
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}

export default AdminCategory;