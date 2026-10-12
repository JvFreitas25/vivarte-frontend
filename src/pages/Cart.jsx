import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import "./Cart.css";

function Cart() {

  const [cart, setCart] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.get(
        `http://localhost:8080/carts/${user.id}`
      );

      setCart(response.data);

    } catch (error) {

      console.error(error);
    }
  }

  async function increaseQuantity(productId) {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const item = cart.items.find(
      item => item.productId === productId
    );

    await axios.patch(
      `http://localhost:8080/carts/${user.id}/items/${productId}`,
      null,
      {
        params: {
          quantity: item.quantity + 1
        }
      }
    );

    loadCart();
  }

  async function decreaseQuantity(productId) {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const item = cart.items.find(
      item => item.productId === productId
    );

    if (item.quantity === 1) {

      await removeItem(productId);

      return;
    }

    await axios.patch(
      `http://localhost:8080/carts/${user.id}/items/${productId}`,
      null,
      {
        params: {
          quantity: item.quantity - 1
        }
      }
    );

    loadCart();
  }

  async function removeItem(productId) {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    await axios.delete(
      `http://localhost:8080/carts/${user.id}/remove`,
      {
        params: {
          productId
        }
      }
    );

    loadCart();
  }

  if (!cart) {
    return <h2>Carregando...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="cart-container">

        <h1>Meu Carrinho</h1>

        {cart.items.length === 0 && (
          <p>Carrinho vazio.</p>
        )}

        {cart.items.map(item => (

          <div
            key={item.id}
            className="cart-item"
          >

            <div className="cart-info">

              <h3>{item.productName}</h3>

              <p>
                Preço unitário: R$ {item.unitPrice}
              </p>

            </div>

            <div className="cart-actions">

              <button
                className="quantity-btn"
                onClick={() =>
                  decreaseQuantity(item.productId)
                }
              >
                -
              </button>

              <span className="quantity-value">
                {item.quantity}
              </span>

              <button
                className="quantity-btn"
                onClick={() =>
                  increaseQuantity(item.productId)
                }
              >
                +
              </button>

              <strong className="subtotal">
                R$ {item.subtotal}
              </strong>

              <button
                className="remove-btn"
                onClick={() =>
                  removeItem(item.productId)
                }
              >
                Remover
              </button>

            </div>

          </div>

        ))}

        <div className="checkout-section">

          <h2>
            Total: R$ {cart.totalPrice}
          </h2>

          <Link to="/checkout">

            <button className="checkout-button">
              Finalizar Compra
            </button>

          </Link>

        </div>

      </div>
    </>
  );
}

export default Cart;