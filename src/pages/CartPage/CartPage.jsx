import { useDispatch, useSelector } from "react-redux";
import "./CartPage.css";
import {
  CartItemCart,
  fetchCart,
  selectCartItems,
  selectCartTotal,
} from "../../features/cart";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/Button/Button";

export function CartPage() {
  const dispatch = useDispatch();

  const cart = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <main className="cart">
      <div className="cart__top">
        <h1>Your cart</h1>
        <Link to="/#products-grid" className="cart__continue">
          Continue shopping
        </Link>
      </div>

      <div className="cart__table">
        <div className="cart__head">
          <div>PRODUCT</div>
          <div>QUANTITY</div>
          <div>TOTAL</div>
        </div>

        <div className="cart__body">
          {cart.filter(Boolean).map((item) => (
            <CartItemCart key={item.cartitemid} item={item} />
          ))}
        </div>
      </div>
      <div className="cart__footer">
        <p className="cart__subtotal">
          Subtotal ${Number(total).toFixed(2)} CAD
        </p>
        <p className="cart__note">Taxes and shipping calculated at checkout</p>
        <Link to="/checkout" className="cart__checkout">
          <Button color="background" type="button" color="background">
            Checkout
          </Button>
        </Link>
      </div>
    </main>
  );
}
