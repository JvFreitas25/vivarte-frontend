import { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "./AdminMenu.jsx";
import "./AdminProduct.css";

function AdminProduct() {

  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {

    loadCategories();

  }, []);

  async function loadCategories() {

    try {

      const response = await axios.get(
        "http://localhost:8080/categories"
      );

      setCategories(response.data);

    } catch (error) {

      console.error(error);

      alert("Erro ao carregar categorias");
    }
  }

  async function handleSubmit(event) {

    event.preventDefault();

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        `http://localhost:8080/products?userId=${user.id}`,
        {
          name,
          description,
          price,
          stock,
          categoryId
        }
      );

      alert("Produto cadastrado!");

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategoryId("");

    } catch (error) {

      console.error(error);

      alert("Erro ao cadastrar produto");
    }
  }

  return (
    <>
      <AdminMenu />

      <div className="product-container">

        <div className="product-card">

          <>
            <h1>Cadastrar Produto</h1>

            <p className="product-subtitle">
              Adicione novos produtos artesanais à loja.
            </p>
          </>
          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

            <div className="product-row">

              <input
                type="number"
                placeholder="Preço"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Estoque"
                value={stock}
                onChange={(e) =>
                  setStock(e.target.value)
                }
              />

            </div>

            <select
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value)
              }
            >
              <option value="">
                Selecione uma categoria
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>

            <button type="submit">
              Salvar Produto
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default AdminProduct;