import { useDispatch, useSelector } from "react-redux";
import "./OrdersPage.css";
import { OrderCard, selectOrders, fetchOrders } from "@/features/orders";
import { useEffect } from "react";

export function OrdersPage() {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <main className="orders">
      <h1>Yours Orders</h1>

      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </main>
  );
}
