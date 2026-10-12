import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Home.css";
import Navbar from "./Navbar.jsx";

function Home() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {

    try {

      const response = search
        ? await axios.get(
          `http://localhost:8080/products/search?name=${search}`
        )
        : await axios.get(
          "http://localhost:8080/products"
        );

      setProducts(response.data);

    } catch (error) {

      console.error(error);
    }
  }

  console.log(products);

  return (
    <>
      <Navbar />

      <div className="home-container">

        <div className="hero-section">

          <h1>
            Artesanato Feito com Carinho
          </h1>

          <p>
            Produtos artesanais,
            feitos à mão com amor e dedicação.
          </p>

        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={loadProducts}>
            Buscar
          </button>
        </div>

        <div className="products-grid">

          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              <img
                src={
                  product.images?.find(
                    img => img.mainImage
                  )?.imageUrl
                }
                alt={product.name}
                className="product-image"
              />

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <strong>
                R$ {product.price}
              </strong>

              <button className="details-button">
                Ver Produto
              </button>

            </div>
          ))}

        </div>
      </div>
    </>
  );
}

export default Home;