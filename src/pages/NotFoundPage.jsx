import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <main className="not-found">
      <section className="not-found__card">
        <h1>404 - Page Not Found</h1>
        <p>The page does not exist</p>
        <Link to="/">Go home</Link>
      </section>
    </main>
  );
}
