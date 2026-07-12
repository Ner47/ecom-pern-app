import { useDispatch, useSelector } from "react-redux";
import "./OrderDetailsPage.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchOrdersById, selectSelectedOrder } from "@/features/orders";

export function OrderDetailsPage() {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const order = useSelector(selectSelectedOrder);

  useEffect(() => {
    dispatch(fetchOrdersById(orderId));
  });

  if (!order) return <main className="order">Loading order ...</main>;

  return (
    <main className="order">
      <h1>Order #{order.id}</h1>

      <p>
        Status: <span>{order.status}</span>
      </p>
      <p>
        Total: <span>{Number(order.total).toFixed(2)} CAD</span>
      </p>

      <div className="order-items">
        {order.items?.map((item) => (
          <div key={item.id} className="order-items__card">
            <img
              className="order-items__image"
              src={`/src/shared/assets/${item.name}.png`}
              alt={item.name}
            />
            <p className="order-items__name">{item.name}</p>
            <p>Quantity: {item.qty}</p>
            <p>Description: {item.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
