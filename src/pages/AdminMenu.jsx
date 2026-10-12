import { useNavigate } from "react-router-dom";
import "./AdminMenu.css";

function AdminMenu() {

  const navigate = useNavigate();

  return (
    <nav className="admin-menu">

      <div className="admin-logo">
        Painel VivArte
      </div>

      <div className="admin-links">

        <button
          onClick={() =>
            navigate("/admin/categories")
          }
        >
          Categorias
        </button>

        <button
          onClick={() =>
            navigate("/admin/products")
          }
        >
          Produtos
        </button>

        <button
          onClick={() =>
            navigate("/admin/orders")
          }
        >
          Pedidos
        </button>

        <button
          onClick={() =>
            navigate("/home")
          }
        >
          Voltar para Loja
        </button>

      </div>

    </nav>
  );
}

export default AdminMenu;