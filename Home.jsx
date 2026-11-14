import { products, formatPrice, placeholder } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

export default function Home() {
  const { addToCart, cart } = useCart();

  return (
    <div>
      {/* Top banner */}
      <section className="rounded-3xl bg-linear-to-r from-slate-900 via-indigo-900 to-indigo-700 text-white px-6 py-12 sm:px-12 sm:py-16 mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
          Find your perfect pair
        </h1>
        <p className="mt-3 max-w-xl text-indigo-100 sm:text-lg">
          Comfortable shoes for running, walking and everyday style.
        </p>
      </section>

      {/* Product cards: 1 column on mobile, 2 on tablet, 4 on laptop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => {
          const inCart = cart.find((item) => item.id === p.id);

          return (
            <article
              key={p.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image box: same size for every card */}
              <div className="h-56 overflow-hidden bg-slate-200">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = placeholder;
                  }}
                />
              </div>

              <div className="flex flex-col flex-1 p-5">
                <p className="text-sm text-slate-500">{p.brand}</p>
                <h3 className="text-lg font-bold">{p.name}</h3>
                <p className="mt-1 text-xl font-extrabold text-indigo-700">
                  {formatPrice(p.price)}
                </p>

                <button
                  onClick={() => addToCart(p)}
                  className="mt-4 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 active:scale-95"
                >
                  {inCart ? `Add another (${inCart.qty} in cart)` : "Add to cart"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}