import { useParams } from "react-router-dom";
import "./ProductDetailsPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductById, selectSelectedProduct } from "@/features/products";
import { Button } from "@/shared/ui/Button/Button";
import { addCartItem } from "@/features/cart";

export function ProductDetailsPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(selectSelectedProduct);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (!product) {
    return <main className="product">Loading product...</main>;
  }

  return (
    <main className="product">
      <section className="product-details">
        <img
          src={`/src/shared/assets/${product.name}.png`}
          alt={product.name}
        />

        <div className="product-info">
          <h1>{product.name}</h1>
          <span>${Number(product.price).toFixed(2)} CAD</span>

          <div className="product__qty">
            <Button
              onClick={() =>
                setQty((prev) => {
                  if (prev === 1) return prev;
                  return prev - 1;
                })
              }
              type="button"
            >
              -
            </Button>
            <input
              type="number"
              name="qty"
              id="qty"
              value={qty}
              min="1"
              onChange={(event) => setQty(Number(event.target.value))}
            />
            <Button onClick={() => setQty((prev) => prev + 1)} type="button">
              +
            </Button>
          </div>

          <Button
            type="button"
            color="background"
            variant="outline"
            onClick={() =>
              dispatch(addCartItem({ productId: product.id, qty: qty }))
            }
          >
            Add to cart
          </Button>

          <p>{product.description}</p>
        </div>
      </section>
    </main>
  );
}
