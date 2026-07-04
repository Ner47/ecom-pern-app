import { useDispatch, useSelector } from "react-redux";
import "./CartPage.css";
import {
  CartItemCart,
  fetchCart,
  selectCartItems,
  selectCartTotal,
} from "../../features/cart";
import { useEffect } from "react";

export function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems) || [];
  const total = useSelector(selectCartTotal) || [];

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <p>Cart: ${total}</p>
      {cart.filter(Boolean).map((item) => (
        <CartItemCart key={item.cartitemid} item={item} />
      ))}
    </>
  );
}
