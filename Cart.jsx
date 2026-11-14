import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice, placeholder } from "../data/products.js";

export default function Cart() {
  const { cart, totalPrice, increase, decrease, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-slate-500">Add a pair of shoes to get started.</p>
        <Link
          to="/"
          className="inline-block mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Browse shoes
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6">Shopping cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-2xl shadow-md p-4 transition hover:shadow-xl"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 sm:w-28 sm:h-24 rounded-xl object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = placeholder;
              }}
            />

            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-slate-500">{formatPrice(item.price)}</p>
            </div>

            {/* Quantity buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decrease(item.id)}
                className="h-9 w-9 rounded-lg border border-slate-300 text-lg transition hover:bg-slate-100"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold">{item.qty}</span>
              <button
                onClick={() => increase(item.id)}
                className="h-9 w-9 rounded-lg border border-slate-300 text-lg transition hover:bg-slate-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <p className="w-28 font-extrabold sm:text-right">
              {formatPrice(item.price * item.qty)}
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 font-medium underline transition hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total and buttons */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-2xl shadow-md p-6">
        <div>
          <p className="text-slate-500">Total</p>
          <p className="text-3xl font-extrabold">{formatPrice(totalPrice)}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="rounded-xl border-2 border-slate-800 px-6 py-3 text-center font-semibold transition hover:bg-slate-800 hover:text-white"
          >
            Continue shopping
          </Link>
          <button
            onClick={() => navigate("/payment")}
            className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-95"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}