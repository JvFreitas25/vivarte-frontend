import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import "./OrderDetails.css";

function getStatusLabel(status) {

  switch (status) {

    case "PENDING":
      return "Aguardando processamento";

    case "PROCESSING":
      return "Em preparação";

    case "SHIPPED":
      return "Enviado";

    case "DELIVERED":
      return "Entregue";

    case "CANCELED":
      return "Cancelado";

    default:
      return status;
  }
}

function OrderDetails() {

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    loadOrder();
  }, []);

  async function loadOrder() {

    try {

      const response = await axios.get(
        `http://localhost:8080/orders/${id}`
      );

      setOrder(response.data);

    } catch (error) {

      console.error(error);
    }
  }

  if (!order) {
    return <h2>Carregando...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="order-details-container">

        <div className="order-header">

          <h1>
            Pedido #{order.id}
          </h1>

          <p>
            <span className="status-badge">
              {getStatusLabel(order.status)}
            </span>
          </p>

          <p>
            Total: R$ {order.totalPrice}
          </p>

          <p>
            Data:
            {" "}
            {new Date(order.createdAt)
              .toLocaleDateString()}
          </p>

        </div>

        <h2 className="order-items-title">
          Itens do Pedido
        </h2>

        {order.items.map(item => (

          <div
            key={item.id}
            className="order-item-card"
          >

            <h3>
              {item.productName}
            </h3>

            <p>
              Quantidade: {item.quantity}
            </p>

            <p>
              Valor Unitário:
              R$ {item.unitPrice}
            </p>

            <p>
              Subtotal:
              R$ {item.subtotal}
            </p>

          </div>

        ))}

      </div>
    </>
  );
}

export default OrderDetails;