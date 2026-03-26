import { Link } from "react-router";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span>Navbar</span>
        {/* <Link to="/" className="navbar-brand">
          Navbar
        </Link> */}
        <button
          type="button"
          aria-expanded="false"
          data-bs-toggle="collapse"
          aria-controls="navbarNav"
          className="navbar-toggler"
          data-bs-target="#navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navbarNav" className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                首頁
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                產品頁
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                購物車
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/checkout" className="nav-link">
                結賬
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                登入
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
