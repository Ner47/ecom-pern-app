import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../model/thunks";
import { Button } from "@/shared/ui/Button/Button";
import { iconDelete } from "../../../shared/assets";

export function CartItemCart({ item }) {
  const dispatch = useDispatch();

  const lineTotal = (item.price ?? 0) * (item.qty ?? 1);

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
    <article className="cart-row">
      <div className="cart-row__product">
        <img
          src={`/src/shared/assets/${item.name}.png`}
          alt={item.name}
          className="cart-row__image"
        />

        <div className="cart-row__info">
          <h3>{item.name}</h3>
        </div>
      </div>
      <div className="cart-row__buttons">
        <div className="cart-row__qty">
          <Button onClick={decrease} type="button">
            -
          </Button>
          <span>{item.qty}</span>
          <Button onClick={increase} type="button">
            +
          </Button>
        </div>

        <div className="cart-row__delete">
          <Button
            className="cart-row__delete"
            onClick={() => dispatch(removeCartItem(item.cartitemid))}
            type="button"
          >
            <img src={iconDelete} />
          </Button>
        </div>
      </div>

      <div className="cart_row__total">${lineTotal.toFixed(2)}<span> CAD</span></div>
    </article>
  );
}
