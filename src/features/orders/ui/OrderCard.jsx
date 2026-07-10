import { Link } from "react-router-dom";
import "./OrderCard.css";

export function OrderCard({ order }) {
  return (
    <article className="order-card">
      <h3>Order #{order.id}</h3>
      <p>
        Status: <span>{order.status}</span>
      </p>
      <p>
        Total: <span>${order.total}</span>
      </p>

      <Link className="order-card__link" to={`/orders/${order.id}`}>
        View details
      </Link>
    </article>
  );
}
