// GlobalContext.js
import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const [amount, setAmount] = useState(5000);


  //carditems-------------------------------------------------------------

  const addItemToCart = (item) => {
    const existingItem = cartItems.find(existing => existing.symbol === item.symbol);

    if (existingItem) {
      // Eğer aynı ürün zaten sepete ekliyse, sadece quantity özelliğini artır
      const updatedCart = cartItems.map(cartItem =>
        cartItem.symbol === existingItem.symbol ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCart);
    } else {
      // Eğer ürün henüz sepete eklenmediyse, yeni bir öğe olarak ekle
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.map(item => {
      if (item.symbol === itemId) {
        if (item.quantity > 1) {
          // Ürünün adeti 1'den fazlaysa adeti azalt
          return { ...item, quantity: item.quantity - 1 };
        } else {
          // Ürünün adeti 1 ise sepette tamamen kaldır
          return null;
        }
      } else {
        return item;
      }
    }).filter(item => item !== null);
  
    setCartItems(updatedCart);
  };

  const removeItemCompletelyFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.symbol !== itemId);
    setCartItems(updatedCart);
  };

  //Amount-----------------------------------------------------

  const updateAmount = (newAmount) => {
    setAmount(newAmount);
  };

  
  return (
    <GlobalContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItemToCart,
        removeItemFromCart,
        removeItemCompletelyFromCart,
        amount,
        updateAmount,
        // Diğer veri türlerini buraya da ekleyebilirsiniz.
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
