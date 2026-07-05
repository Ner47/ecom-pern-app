import { Link } from "react-router-dom";

export function OrderCard({ order }) {
  return (
    <article className="order-card">
      <h3>Order #{order.id}</h3>
      <p>Status: {order.status}</p>
      <p>Total: ${order.total}</p>

      <Link to={`/orders/${order.id}`}>View details</Link>
    </article>
  );
}
