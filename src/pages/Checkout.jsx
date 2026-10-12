import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

import Navbar from "./Navbar";

function Checkout() {

  const [shippingAddress, setShippingAddress] = useState("");

  const navigate = useNavigate();

  async function finishOrder(event) {

    event.preventDefault();

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.post(
        "http://localhost:8080/orders",
        {
          userId: user.id,
          shippingAddress
        }
      );

      alert("Pedido criado com sucesso!");

      navigate(`/orders/${response.data.id}`);

    } catch (error) {

      console.error(error);

      alert("Erro ao criar pedido");
    }
  }

  return (
    <>
      <Navbar />

      <div className="checkout-container">

        <>
          <h1>Finalizar Compra</h1>

          <p className="checkout-subtitle">
            Informe o endereço de entrega para concluir seu pedido.
          </p>
        </>

        <form onSubmit={finishOrder}>

          <textarea
            placeholder="Digite o endereço completo"
            value={shippingAddress}
            onChange={(e) =>
              setShippingAddress(e.target.value)
            }
          />

          <button type="submit">
            Confirmar Pedido
          </button>

        </form>

      </div>
    </>
  );
}

export default Checkout;