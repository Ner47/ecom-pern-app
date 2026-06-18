import { Outlet } from "react-router-dom";
import { Header } from "../../widgets/Header/Header";
import "./MainLayout.css";
import { Footer } from "../../widgets/Footer/Footer";

export function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout__content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
