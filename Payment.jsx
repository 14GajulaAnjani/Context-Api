import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice, placeholder } from "../data/products.js";

const emptyForm = { name: "", number: "", expiry: "", cvv: "" };

// Check the form. Returns an object with error messages.
function validate(f) {
  const errors = {};

  if (!/^[A-Za-z][A-Za-z .'-]{1,}$/.test(f.name.trim()))
    errors.name = "Enter the name on your card.";

  if (f.number.replace(/\s/g, "").length !== 16)
    errors.number = "Card number must have 16 digits.";

  const m = f.expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!m || +m[1] < 1 || +m[1] > 12) {
    errors.expiry = "Use MM/YY, for example 12/30.";
  } else {
    const endOfMonth = new Date(2000 + +m[2], +m[1], 0, 23, 59, 59);
    if (endOfMonth < new Date()) errors.expiry = "This card has expired.";
  }

  if (!/^\d{3}$/.test(f.cvv)) errors.cvv = "CVV must have 3 digits.";

  return errors;
}

const inputClass =
  "w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:outline-hidden";

export default function Payment() {
  const { cart, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  // Runs when the user types in any box
  const handleChange = (e) => {
    const { name, value } = e.target;
    let v = value;

    if (name === "number") {
      // only digits, max 16, space after every 4 digits
      v = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    } else if (name === "expiry") {
      // adds the / automatically
      const d = value.replace(/\D/g, "").slice(0, 4);
      v = d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
    } else if (name === "cvv") {
      v = value.replace(/\D/g, "").slice(0, 3);
    }

    setForm({ ...form, [name]: v });
    setErrors({ ...errors, [name]: undefined });
  };

  // Runs when the user clicks Pay
  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Demo only: no real payment happens
    setOrder({
      id: "SK" + Date.now().toString().slice(-8),
      total: totalPrice,
      count: cart.reduce((sum, item) => sum + item.qty, 0),
    });
    clearCart();
    setForm(emptyForm);
  };

  // After payment
  if (order) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
          ✓
        </div>
        <h2 className="text-2xl font-extrabold text-green-700">Payment successful</h2>
        <p className="mt-2 text-slate-600">
          Order <strong>{order.id}</strong> for {order.count} item(s),{" "}
          <strong>{formatPrice(order.total)}</strong>, is confirmed.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Shop more
        </Link>
      </div>
    );
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-10 text-center">
        <h2 className="text-2xl font-bold">Nothing to pay for</h2>
        <p className="mt-2 text-slate-500">Your cart is empty. Add shoes first.</p>
        <Link
          to="/"
          className="inline-block mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Back to shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6">Payment</h1>

      {/* 1 column on mobile, 2 columns on laptop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT: order summary from Context */}
        <section className="bg-white rounded-2xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-bold">Order summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-20 rounded-lg object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = placeholder;
                }}
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-slate-500">
                  {item.qty} × {formatPrice(item.price)}
                </p>
              </div>
              <strong>{formatPrice(item.price * item.qty)}</strong>
            </div>
          ))}

          <div className="flex justify-between border-t border-slate-200 pt-4 text-xl font-extrabold">
            <span>Total to pay</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/"
              className="rounded-xl border-2 border-slate-800 px-5 py-3 text-center font-semibold transition hover:bg-slate-800 hover:text-white"
            >
              Back to shopping
            </Link>
            <Link
              to="/cart"
              className="rounded-xl px-5 py-3 text-center font-semibold text-indigo-600 underline transition hover:text-indigo-800"
            >
              Edit cart
            </Link>
          </div>
        </section>

        {/* RIGHT: card preview + form */}
        <section className="space-y-6">
          {/* Live card preview */}
          <div className="rounded-2xl bg-linear-to-br from-indigo-700 via-indigo-800 to-slate-900 p-6 text-white shadow-xl">
            <p className="text-sm text-indigo-200">Credit card</p>
            <p className="mt-6 text-xl sm:text-2xl tracking-widest">
              {form.number || "•••• •••• •••• ••••"}
            </p>
            <div className="mt-6 flex justify-between text-sm">
              <span className="uppercase">{form.name || "Your name"}</span>
              <span>{form.expiry || "MM/YY"}</span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-2xl shadow-md p-6 space-y-4"
          >
            <h2 className="text-xl font-bold">Credit card details</h2>
            <p className="text-sm text-slate-500">
              Demo only. Do not enter a real card number.
            </p>

            <div>
              <label htmlFor="name" className="mb-1 block font-medium">Name on card</label>
              <input id="name" name="name" value={form.name} onChange={handleChange}
                     placeholder="Anjani Gajula" autoComplete="cc-name" className={inputClass} />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="number" className="mb-1 block font-medium">Card number</label>
              <input id="number" name="number" value={form.number} onChange={handleChange}
                     placeholder="1234 5678 9012 3456" inputMode="numeric"
                     autoComplete="cc-number" className={inputClass} />
              {errors.number && <p className="mt-1 text-sm text-red-600">{errors.number}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry" className="mb-1 block font-medium">Expiry</label>
                <input id="expiry" name="expiry" value={form.expiry} onChange={handleChange}
                       placeholder="MM/YY" inputMode="numeric"
                       autoComplete="cc-exp" className={inputClass} />
                {errors.expiry && <p className="mt-1 text-sm text-red-600">{errors.expiry}</p>}
              </div>
              <div>
                <label htmlFor="cvv" className="mb-1 block font-medium">CVV</label>
                <input id="cvv" name="cvv" type="password" value={form.cvv} onChange={handleChange}
                       placeholder="123" inputMode="numeric"
                       autoComplete="cc-csc" className={inputClass} />
                {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-orange-500 py-3 text-lg font-bold text-white transition hover:bg-orange-600 active:scale-95"
            >
              Pay {formatPrice(totalPrice)}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}