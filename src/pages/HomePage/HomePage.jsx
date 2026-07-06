import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  selectProductsStatus,
  selectSelectedProduct,
  fetchProducts,
  ProductCard,
} from "@/features/products";

import "./HomePage.css";
import { useEffect } from "react";

export function HomePage() {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectSelectedProduct);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <main className="page">Loading products...</main>;
  }

  if (status === "failed") {
    return <main className="page">Error: {error}</main>;
  }

  return (
    <main className="page">
      <h1>Products</h1>

      <section className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
