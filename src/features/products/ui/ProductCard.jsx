import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/Button/Button";
import { addCartItem } from "@/features/cart";

export function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`}>
        <img className="product-card__image" alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <strong>{product.price}</strong>
        <Button
          onClick={() => dispatch(addCartItem({ productId: product.id }))}
        >
          Add to cart
        </Button>
      </Link>
    </article>
  );
}
