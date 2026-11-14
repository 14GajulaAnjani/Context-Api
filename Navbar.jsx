import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Navbar() {
  const { totalItems } = useCart();

  // Link style: white and underlined when the page is active
  const linkClass = ({ isActive }) =>
    "px-1 pb-1 font-medium transition hover:text-orange-400 " +
    (isActive ? "text-white border-b-2 border-orange-500" : "text-slate-300");

  return (
    <header className="sticky top-0 z-10 bg-slate-900 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-white tracking-tight">
          Stride<span className="text-orange-500">Kart</span>
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>Shop</NavLink>
          <NavLink to="/cart" className={linkClass}>
            Cart
            <span className="ml-2 inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-orange-500 text-white text-xs font-bold">
              {totalItems}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}