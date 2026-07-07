import { Link } from "react-router-dom";
import "./Header.css";
import { iconCart, iconProfile } from "../../shared/assets";

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/" className="header__home">
            DAWN
          </Link>
        </div>
        <div className="header__actions">
          <Link to="/account" className="header__profile">
            <img
              className="header__profile"
              src={iconProfile}
              alt="profile"
              aria-hidden="true"
            />
          </Link>
          <Link to="/cart" className="header__profile">
            <img
              className="header__profile"
              src={iconCart}
              alt="cart"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
