import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const context = createContext();
export function useAuth(){
    return useContext(context);
}
export const UseAuth = ({children}) => {
     const [products , setProducts] = useState([]);
       useEffect(()=>{
       const fetcher= async()=>{
        let res = await axios.get("https://ecom-backend-spring.onrender.com/api/products");
      
        setProducts(res.data);

        }
        fetcher();
    },[])


     const [cart, setCart] = useState([]);
  // In a real app, you would also manage user authentication state here (e.g., const [user, setUser] = useState(null);)

  // 1. Logic to remove an item completely
  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // 2. Logic to increase item quantity
  const incrementQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // 3. Logic to decrease item quantity (The requested function)
  const decrementQuantity = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === itemId) {
          // Check if quantity is greater than 1 before decrementing
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });

      // Filter out items whose quantity is now 0 or less (though the UI should prevent this)
      // Note: Since the UI disables the button at 1, this part primarily handles direct API/internal calls.
      const itemToDecrement = prevCart.find(item => item.id === itemId);
      if (itemToDecrement && itemToDecrement.quantity === 1) {
        // If we click decrement when quantity is 1, we remove the item
        return prevCart.filter(item => item.id !== itemId);
      }
      
      return updatedCart.filter((item) => item.quantity > 0);
    });
  }

    const data ={
      products , 
      setProducts, 
      cart , 
      setCart,
      removeItem,
      incrementQuantity,
      decrementQuantity
    }

  
  return (
    <context.Provider value={data}>
        {children}
    </context.Provider>
  )
}

