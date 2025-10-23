import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../Backend/UseAuth';
import toast from 'react-hot-toast';

export const ProductPreview = () => {
  const [product , setProduct] = useState();
  const {addToCart ,setProducts} = useAuth();
  const id = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    const getProduct = async()=>{
      let res = await axios.get(`https://ecom-backend-spring.onrender.com/api/product/${id.id}`)
      setProduct(res.data);

    }
    getProduct();
  },[])

  const handleDelete = async()=>{
    await axios.delete(`https://ecom-backend-spring.onrender.com/api/product/${id.id}`);
    toast.success("Item Deleted Successfully ✅");
    setProducts(prev => prev.filter(p => p.id !== id));
    navigate("/");
  }


    const LoadingScreen = () => (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-10 bg-gray-800 rounded-xl shadow-2xl">
            <div className="w-16 h-16 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
            <h1 className="text-xl mt-4 text-gray-400 font-bold">Summoning Product Details .... 🌀</h1>
        </div>
    );   
 if (!product) {
        return <LoadingScreen />;
    }

    // After loading, render the styled product details
    return (
    <div className="max-w-4xl mx-auto p-8 mt-28 bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl shadow-2xl border border-gray-700">
        
        {/* Header: Product Name & Description */}
        <header className="mb-8 pb-4 border-b border-gray-700">
        <h1 className="text-5xl font-extrabold text-gradient bg-clip-text text-transparent bg-orange-400/80 mb-2">
            {product.name}
        </h1>
        <p className="text-gray-400 text-lg italic">{product.description}</p>
        </header>

        {/* Details Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Price Card */}
        <div className="p-6 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg hover:shadow-2xl transition-shadow">
            <span className="text-sm font-medium text-gray-300 block">Price</span>
            <h3 className="text-4xl font-bold text-cyan-400 mt-2">${product.price}</h3>
        </div>

        {/* Inventory Card */}
        <div className="p-6 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg hover:shadow-2xl transition-shadow">
            <span className="text-sm font-medium text-gray-300 block">Inventory</span>
            <h3 className="text-3xl font-bold text-orange-300 mt-2">{product.quantity}</h3>
        </div>

        {/* Availability Full Width */}
        <div className="md:col-span-2 p-6 bg-gray-800/50 rounded-xl flex items-center justify-between border border-gray-700 shadow-inner">
            <span className="text-lg font-semibold text-gray-300">Available:</span>
            <span className={`text-xl font-extrabold px-5 py-2 rounded-full transition-all shadow-lg ${
            product.available 
                ? "bg-green-500 text-white shadow-green-400/40" 
                : "bg-red-500 text-white shadow-red-400/40"
            }`}>
            {product.available ? "In Stock" : "Out of Stock"}
            </span>
        </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-700">
        
        {/* Add to Cart */}
        <button 
            onClick={() => {
            addToCart(product);
            toast.success("Added to Cart ✅");
            }}
            className="flex-1 py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-orange-500 to-yellow-400 text-gray-900 hover:scale-[1.03] transition-transform shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            Add to Cart
        </button>

        {/* Update */}
        <button
            className="flex-1 py-4 rounded-xl text-lg font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
            // onClick={() => navigate('/addProduct', { state: { product } })}
        >
            Update
        </button>

        {/* Delete */}
        <button
            onClick={handleDelete}
            className="flex-1 py-4 rounded-xl text-lg font-bold bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl transition-all"
        >
            Delete
        </button>
        </div>
    </div>
    );

}
