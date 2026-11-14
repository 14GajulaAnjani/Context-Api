import { createContext, useContext, useEffect, useReducer } from "react";

// Step 1: Create the context
const CartContext = createContext();

// Reducer: all cart changes happen here
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const found = state.find((item) => item.id === action.payload.id);
      if (found) {
        return state.map((item) =>
          item.id === found.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    }
    case "INCREASE":
      return state.map((item) =>
        item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
      );
    case "DECREASE":
      return state
        .map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0);
    case "REMOVE":
      return state.filter((item) => item.id !== action.payload);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

// Keep the cart after page refresh
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
}

// Step 2: Provider holds the state and shares it
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      /* ignore storage errors */
    }
  }, [cart]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const value = {
    cart,
    totalItems,
    totalPrice,
    addToCart: (product) => dispatch({ type: "ADD", payload: product }),
    increase: (id) => dispatch({ type: "INCREASE", payload: id }),
    decrease: (id) => dispatch({ type: "DECREASE", payload: id }),
    removeFromCart: (id) => dispatch({ type: "REMOVE", payload: id }),
    clearCart: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Step 3: Custom hook to consume the context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}