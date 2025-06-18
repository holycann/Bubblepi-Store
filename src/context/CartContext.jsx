import { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [cartOpen, setCartOpen] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if product exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += product.quantity || 1;
        return updatedCart;
      } else {
        // Add new product to cart
        return [...prevCart, { ...product, quantity: product.quantity || 1 }];
      }
    });
    
    // Show cart feedback (optional)
    setCartOpen(true);
    setTimeout(() => setCartOpen(false), 3000);
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total items in cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate subtotal
  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.discount 
        ? item.price - (item.price * (item.discount / 100))
        : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getSubtotal,
        setCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 