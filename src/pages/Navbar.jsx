import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  function logout() {

    localStorage.removeItem("user");

    window.location.href = "/";
  }

  return (
    <nav className="navbar">

      <div className="navbar-logo">

        <Link to="/home">
          VivArte
        </Link>

      </div>

      <div className="navbar-links">

        <Link to="/home">
          Início
        </Link>

        <Link to="/cart">
          Carrinho
        </Link>

        <Link to="/my-orders">
          Meus Pedidos
        </Link>

        {user?.role === "ADMIN" && (
          <Link to="/admin/categories">
            Painel Admin
          </Link>
        )}

      </div>

      <div className="navbar-user">

        <span>
          Olá, {user?.name}
        </span>

        <button onClick={logout}>
          Sair
        </button>

      </div>

    </nav>
  );
}

export default Navbar;