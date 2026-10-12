import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";
import "./MyOrders.css";

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

function MyOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            const response = await axios.get(
                `http://localhost:8080/orders/user/${user.id}`
            );

            setOrders(response.data);

        } catch (error) {

            console.error(error);
        }
    }

    return (
        <>
            <Navbar />

            <div className="orders-container">

                <h1>Meus Pedidos</h1>

                {orders.length === 0 && (
                    <div className="empty-orders">
                        <h2>Nenhum pedido encontrado</h2>

                        <p>
                            Seus pedidos aparecerão aqui após a primeira compra.
                        </p>
                    </div>
                )}

                {orders.map(order => (

                    <Link
                        to={`/orders/${order.id}`}
                        key={order.id}
                        className="order-link"
                    >

                        <div className="order-card">

                            <h3>
                                Pedido #{order.id}
                            </h3>

                            <p>
                                Status: {getStatusLabel(order.status)}
                            </p>

                            <p>
                                Total: R$ {order.totalPrice}
                            </p>

                            <p>
                                Data: {
                                    new Date(
                                        order.createdAt
                                    ).toLocaleDateString()
                                }
                            </p>

                        </div>

                    </Link>

                ))}

            </div>
        </>
    );
}

export default MyOrders;