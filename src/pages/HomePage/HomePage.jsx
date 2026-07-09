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
import { Button } from "@/shared/ui/Button/Button";
import { heroBg } from "@/shared/assets";
import { cutLabel, refLabel } from "../../shared/assets";

export function HomePage() {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectSelectedProduct);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <main className="home">Loading products...</main>;
  }

  if (status === "failed") {
    return <main className="home">Error: {error}</main>;
  }

  return (
    <main className="home">
      <section className="home-hero" style={{ "--hero-bg": `url(${heroBg})` }}>
        <div className="home-hero__title">
          <h1>Industrial design meets fashion</h1>
          <span>Atypical leather goods</span>
          <a href="#home-products">
            <Button type="button" variant="outline">
              Add to cart
            </Button>
          </a>
        </div>
      </section>

      <section className="home-products" id="home-products">
        <div className="home-products__title">
          <h2>Obsessive Attention. Intelligent Effort.</h2>
          <span>
            Functional handbags made of luxurious and honest materials to
            improve people's lives in small but mighty ways.
          </span>
        </div>
        <div className="home-products__container">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="home-quote" id="products-grid">
        <div className="home-quote__container">
          <img src={refLabel} alt="REFINERY29 logo" />
          <span>
            "The leather is sourced from environmentally friendly tanneries in
            Italy, France, and Turkey, where Rure is based and everything is
            assembled by hand."
          </span>
        </div>
        <div className="home-quote__container">
          <img src={cutLabel} alt="the CUT logo" />
          <span>
            "All too often, we're forced to pick: style, or sustainability.
            Recently, more designers have been making environmental impact a top
            priority"
          </span>
        </div>
      </section>
    </main>
  );
}
