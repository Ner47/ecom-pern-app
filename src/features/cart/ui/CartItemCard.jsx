import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../model/thunks";
import { Button } from "@/shared/ui/Button/Button";

export function CartItemCart({ item }) {
  const dispatch = useDispatch();

  if (!item) {
    return null;
  }

  function decrease() {
    if (item.qty <= 1) {
      dispatch(removeCartItem(item.cartitemid));
      return;
    }

    dispatch(
      updateCartItem({
        itemId: item.cartitemid,
        qty: item.qty - 1,
      }),
    );
  }

  function increase() {
    dispatch(
      updateCartItem({
        itemId: item.cartitemid,
        qty: item.qty + 1,
      }),
    );
  }

  return (
    <article className="cart-item-card">
      <img className="cart-item-card__image" alt={item.name} />

      <div>
        <h3>{item.name}</h3>
        <p>${item.price}</p>
        <div className="cart-item-card__actions">
          <Button onClick={decrease} type="button">
            -
          </Button>
          <span>{item.qty}</span>
          <Button onClick={increase} type="button">
            +
          </Button>
          <Button
            onClick={() => dispatch(removeCartItem(item.cartitemid))}
            type="button"
          >
            Remove
          </Button>
        </div>
      </div>
    </article>
  );
}
