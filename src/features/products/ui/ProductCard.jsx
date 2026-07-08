import { Link } from "react-router-dom";
import "./ProductCard.css";

export function ProductCard({ product }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <img
          className="product-card__image"
          alt={product.name}
          src={`/src/shared/assets/${product.name}.png`}
        />
        <h3>{product.name}</h3>
        <span>${product.price}.00 CAD</span>
      </Link>
    </article>
  );
}
