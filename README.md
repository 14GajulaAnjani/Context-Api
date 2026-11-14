StrideKart - Shoe Store with Payment

This is an online shoe store made with React. It has a shopping cart and a
payment page. The cart data is shared between all pages using the Context API.

FEATURES

1. Shop page with shoe cards and an Add to cart button.
2. Cart page where you can increase, decrease or remove items and see the total.
3. A "Proceed to Payment" button in the cart that opens the payment page.
4. Payment page that shows the cart items using the Context API.
5. Back to shopping and Edit cart options on the payment page.
6. Credit card form with checks for name, 16 digit card number, expiry (MM/YY) and 3 digit CVV.
7. Success message after payment, and the cart becomes empty.
8. Hover effects on cards and buttons.
9. Works on mobile, tablet and laptop (responsive design with Tailwind CSS).

Note: This is a demo. No real payment is made. Do not enter a real card number.

TECHNOLOGIES USED

React, Vite, Tailwind CSS, React Router, Context API, useReducer

FOLDER STRUCTURE

src/context/CartContext.jsx   - Context API (cart state)
src/pages/Home.jsx            - Shop page
src/pages/Cart.jsx            - Cart page
src/pages/Payment.jsx         - Payment page
src/components/Navbar.jsx     - Top menu
src/data/products.js          - Shoe list with image links
src/App.jsx                   - Page routes
src/main.jsx                  - Starts the app and adds CartProvider
src/index.css                 - Tailwind import

HOW CONTEXT API IS USED

1. CartContext.jsx creates the context with createContext().
2. CartProvider holds the cart items and the functions (add, remove, clear).
3. main.jsx wraps the whole app with CartProvider.
4. Any page uses the useCart() hook to get the cart items.

SHOE IMAGES

The shoe image links are in src/data/products.js.
To change a picture, replace the link after image:

HOW TO RUN

1. Open the project folder in the terminal.
2. npm install
3. npm install tailwindcss @tailwindcss/vite
4. npm run dev
5. Open http://localhost:5173 in the browser.

HOW TO TEST

1. Add shoes to the cart. The cart number goes up.
2. Open the Cart page and change the quantity.
3. Click Proceed to Payment. The same items are shown.
4. Click Back to shopping, change the cart, and come back.
5. Click Pay with an empty form. Error messages are shown.
6. Use test details: Name: any name, Card: 4111 1111 1111 1111, Expiry: 12/30, CVV: 123.
7. The message "Payment successful" is shown.

SCREENSHOTS

Shop page, cart page and payment page screenshots can be added here.