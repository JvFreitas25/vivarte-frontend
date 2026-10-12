import { useEffect, useState } from "react";
import axios from "axios";

import AdminMenu from "./AdminMenu";
import "./AdminOrders.css";

function getStatusLabel(status) {

  switch (status) {

    case "PENDING":
      return "Pendente";

    case "PAID":
      return "Pago";

    case "SHIPPED":
      return "Enviado";

    case "DELIVERED":
      return "Entregue";

    default:
      return status;
  }
}

function AdminOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {

    try {

      const response = await axios.get(
        "http://localhost:8080/orders"
      );

      setOrders(response.data);

    } catch (error) {

      console.error(error);
    }
  }

  async function updateStatus(orderId, status) {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.patch(
        `http://localhost:8080/orders/${orderId}/status`,
        null,
        {
          params: {
            status,
            userId: user.id
          }
        }
      );

      loadOrders();

    } catch (error) {

      console.error(error);

      alert("Erro ao atualizar status");
    }
  }

  return (
    <>
      <AdminMenu />

      <div className="admin-orders-container">

        <h1>Gerenciar Pedidos</h1>

        {orders.map(order => (

          <div
            key={order.id}
            className="admin-order-card"
          >

            <h3>
              Pedido #{order.id}
            </h3>

            <p>
              Cliente ID: {order.userId}
            </p>

            <p>
              Status Atual:
              {" "}
              <span className="status-badge">
                {getStatusLabel(order.status)}
              </span>
            </p>

            <p>
              Total: R$ {order.totalPrice}
            </p>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(
                  order.id,
                  e.target.value
                )
              }
            >
              <option value="PENDING">
                Pendente
              </option>

              <option value="PAID">
                Pago
              </option>

              <option value="SHIPPED">
                Enviado
              </option>

              <option value="DELIVERED">
                Entregue
              </option>
            </select>

          </div>

        ))}

      </div>
    </>
  );
}

export default AdminOrders;