// ===== YOUR SHOES ARE HERE =====
// To change a shoe picture, replace the link inside the quotes after image:
// The link must open ONLY the picture when you paste it in a new browser tab.

export const products = [
  {
    id: 1,
    name: "Blue Sprint",
    brand: "StrideKart",
    price: 2499,
    image: "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Olive Trail",
    brand: "StrideKart",
    price: 3199,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Classic White",
    brand: "StrideKart",
    price: 3899,
    image: "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Red Runner",
    brand: "StrideKart",
    price: 2899,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
];

// Shows price like ₹2,499
export const formatPrice = (n) => "₹" + n.toLocaleString("en-IN");

// Grey picture shown if a link does not work
export const placeholder = "https://placehold.co/600x400/e2e8f0/64748b?text=Shoe";