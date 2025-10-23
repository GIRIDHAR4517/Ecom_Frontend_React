import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DiVim } from 'react-icons/di';
import { useAuth } from '../../../Backend/UseAuth';
import { NavLink } from 'react-router-dom';

export const Home = () => {

   const {products} = useAuth();
   


   return (
    <div className="min-h-screen bg-gray-900 text-white pt-28 pb-10 font-sans">
        
        {!products.length ? (
        // --- STYLED LOADING STATE ---
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center p-12 bg-gray-800/70 backdrop-blur-md rounded-3xl max-w-lg mx-auto shadow-2xl border border-indigo-500/30">
            <h1 className="text-5xl font-extrabold text-indigo-400 animate-pulse tracking-widest">
                Products On the Way
            </h1>
            <p className="text-2xl mt-4 text-gray-400">Loading data... 🏃‍♂️</p>
            </div>
        </div>
        ) : (
        // --- STYLED PRODUCT GRID ---
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product) => (
            <section
                key={product.id}
                className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-3xl shadow-xl shadow-black/60 
                        hover:shadow-cyan-500/50 transition duration-300 transform hover:scale-[1.03] 
                        border border-gray-700/50 flex flex-col justify-between"
            >
                <div>
                {/* Product Name */}
                <h3 className="text-2xl font-extrabold text-gradient bg-clip-text text-transparent bg-cyan-400/80 mb-2 truncate">
                    {product.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 h-12 overflow-hidden line-clamp-2">
                    {product.description}
                </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700/50 space-y-3">
                {/* Price */}
                <h4 className="text-3xl font-black text-indigo-400 tracking-tight">
                    ${product.price}
                </h4>

                {/* Quantity */}
                <div className="flex justify-between items-center text-sm text-gray-300">
                    <span className="font-medium">Quantity</span>
                    <span className="text-white font-bold">{product.quantity}</span>
                </div>

                {/* Availability */}
                <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-300">Available</span>
                    <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${
                        product.available
                        ? "bg-green-600/30 text-green-300 border-green-600"
                        : "bg-red-600/30 text-red-300 border-red-600"
                    }`}
                    >
                    {product.available ? "Yes" : "No"}
                    </span>
                </div>
                </div>

                {/* View Product Button */}
                <NavLink
                to={`/${product.id}`}
                className="inline-flex items-center justify-center h-10 px-4 mt-4 text-sm font-semibold 
                            rounded-lg border border-indigo-600 text-indigo-400 
                            hover:bg-indigo-700 hover:border-indigo-700 hover:text-white 
                            transition duration-200 shadow-lg flex-shrink-0"
                >
                View Product
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                </svg>
                </NavLink>
            </section>
            ))}
        </div>
        )}
    </div>
    );

}
