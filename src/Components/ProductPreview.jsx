import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Backend/UseAuth';

export const ProductPreview = () => {
  const [product , setProduct] = useState();
  const {cart,setCart} = useAuth();
  const id = useParams();
  useEffect(()=>{
    const getProduct = async()=>{
      let res = await axios.get(`http://localhost:8080/api/product/${id.id}`)
      setProduct(res.data);

    }
    getProduct();
  },[])

  const handleDelete = async()=>{
    await axios.delete(`http://localhost:8080/api/product/${id.id}`)
  }

  const handleCart =()=>{
    setCart([...cart , product]);
  }
  const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-10 bg-gray-800 rounded-xl shadow-2xl">
        <div className="w-16 h-16 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
        <h1 className="text-xl mt-4 text-gray-400 font-bold">Summoning Product Details .... 🌀</h1>
    </div>
);    if (!product) {
        return <LoadingScreen />;
    }

    // After loading, render the styled product details
    return (
        // Main Container: Centered, dark card, shadow for depth
        <div className="max-w-4xl mx-auto p-8 bg-gray-800 rounded-2xl shadow-2xl shadow-indigo-900/50 border border-gray-700">
            
            {/* Header / Name and Description */}
            <header className="mb-8 pb-4 border-b border-gray-700">
                <h1 className="text-4xl font-extrabold text-orange-400 mb-2">{product.name}</h1>
                <p className="text-gray-400 text-lg italic">{product.description}</p>
            </header>

            {/* Details Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                
                {/* Price Block */}
                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-700">
                    <span className="text-sm font-medium text-gray-300 block">Price Jutsu</span>
                    <h3 className="text-3xl font-bold text-cyan-400 mt-1">{product.price}</h3>
                </div>

                {/* Quantity Block */}
                <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-700">
                    <span className="text-sm font-medium text-gray-300 block">Inventory Count</span>
                    <span className="text-3xl font-bold text-gray-200 mt-1">
                        Quantity: <strong className="text-orange-300">{product.quantity}</strong>
                    </span>
                </div>

                {/* Availability Status (Spanning full width) */}
                <div className="md:col-span-2 p-4 bg-gray-700/50 rounded-lg flex items-center justify-between border border-gray-700">
                    <span className="text-lg font-semibold text-gray-300">Available:</span>
                    <span className={`text-xl font-extrabold px-4 py-2 rounded-full shadow-lg transition-colors ${
                        product.available 
                            ? 'bg-green-600 text-white shadow-green-500/30' 
                            : 'bg-red-600 text-white shadow-red-500/30'
                    }`}>
                        {product.available ? "Yes" : "No"}
                    </span>
                </div>
            </section>
            
            {/* Action Buttons (Update and Delete) */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
                  <button 
                      className="flex-1 py-3 rounded-xl text-lg font-bold transition-all duration-300 
                              flex items-center justify-center 
                              bg-orange-500 text-gray-900 
                              hover:bg-orange-600 shadow-xl shadow-orange-500/40 
                              hover:scale-[1.01] active:scale-[0.99]"
                      onClick={handleCart}
                      // Add onClick={handleAddToCart} when ready
                  >
                      {/* Cart Icon (replaces text) */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                          <line x1="3" y1="6" x2="21" y2="6"></line>
                          <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                  </button>
                
                {/* Update Button (Accent Color: Orange/Success) */}
                <button 
                    className="flex-1 py-3 rounded-xl text-lg font-bold transition-all duration-300 
                               bg-orange-500 text-white 
                               hover:bg-orange-600 shadow-xl shadow-orange-500/40 
                               hover:scale-[1.01] active:scale-[0.99]"
                    // Add onClick={handleUpdate} when ready
                >
                    Update
                </button>
                
                {/* Delete Button (Cautionary Color: Red) */}
                <button 
                    className="flex-1 py-3 rounded-xl text-lg font-bold transition-all duration-300 
                               bg-red-600 text-white 
                               hover:bg-red-700 shadow-xl shadow-red-500/40 
                               hover:scale-[1.01] active:scale-[0.99]"
                    onClick={handleDelete}
                    // Add onClick={handleDelete} when ready
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
