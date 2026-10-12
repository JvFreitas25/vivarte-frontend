import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import "./ProductDetails.css";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {

    try {

      const response = await axios.get(
        `http://localhost:8080/products/${id}`
      );

      setProduct(response.data);

    } catch (error) {

      console.error(error);
    }
  }

  if (!product) {
    return <h2>Carregando...</h2>;
  }

  async function addToCart() {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        `http://localhost:8080/carts/${user.id}/add`,
        null,
        {
          params: {
            productId: product.id,
            quantity: 1
          }
        }
      );

      alert("Produto adicionado ao carrinho!");

    } catch (error) {

      console.error(error);

      alert("Erro ao adicionar produto");
    }
  }

  return (
    <>
      <Navbar />

      <div className="product-details">

        <div className="product-image-area">
          <div className="product-image-placeholder">
            <img
              src={
                product.images?.find(
                  img => img.mainImage
                )?.imageUrl
              }
              alt={product.name}
              className="details-image"
            />
          </div>
        </div>

        <div className="product-info">

          <span className="product-category">
            {product.category?.name}
          </span>

          <h1>
            {product.name}
          </h1>

          <p className="product-description">
            {product.description}
          </p>

          <h2 className="product-price">
            R$ {product.price}
          </h2>

          <p className="product-stock">
            Estoque disponível: {product.stock}
          </p>

          <button
            className="add-cart-button"
            onClick={addToCart}
          >
            Adicionar ao Carrinho
          </button>

        </div>
      </div>
    </>
  );
}

export default ProductDetails;