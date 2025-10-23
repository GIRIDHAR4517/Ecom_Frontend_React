import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

export const AddProduct = () => {
    const [productData , setProductData] = useState({brand:"" , name:"" , description:"",release_date:"" ,quantity:1 ,price:"" ,available:true});

    const {brand , name , description, release_date, quantity ,price ,available} = productData;

    const handleOnchange = (e) => {
      const { name, type, value, checked } = e.target;
      setProductData({
        ...productData,
        [name]: type === "checkbox" ? checked : value,
      });
   };

    const handleSubmit = async (e)=>{
      e.preventDefault();
      try{
      await axios.post("https://ecom-backend-spring.onrender.com/api/product" ,productData );
       toast.success("Item Added Successfully ✅")
      }catch(err){
        toast.error("Failed to add the Item ❌");
        throw err;
      }
     
      setProductData({brand:"" , name:"" , description:"",release_date:"" ,quantity:"" ,price:"" ,available:""});

    }
return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-purple-900 text-white py-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto bg-gray-800/60 backdrop-blur-md rounded-3xl shadow-2xl border border-indigo-700/40 p-8">
        <h1 className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-purple-400/70 mb-6">
           Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleOnchange}
              placeholder="Enter product name"
              className="w-full p-3 rounded-xl bg-gray-900/50 border border-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={brand}
              onChange={handleOnchange}
              placeholder="Enter brand"
              className="w-full p-3 rounded-xl bg-gray-900/50 border border-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={description}
              onChange={handleOnchange}
              placeholder="Enter product description"
              className="w-full p-3 rounded-xl bg-gray-900/50 border border-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 h-32 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-semibold mb-2">Release Date</label>
              <input
                type="date"
                name="release_date"
                value={release_date}
                onChange={handleOnchange}
                className="w-full p-3 rounded-xl bg-gray-900/50 border border-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={handleOnchange}
                min={1}
                className="w-full p-3 rounded-xl bg-gray-900/50 border border-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-2">Price ($)</label>
              <input
                type="text"
                name="price"
                value={price}
                onChange={handleOnchange}
                className="w-full p-3 rounded-xl bg-gray-900/50 border border-indigo-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400"
              />
            </div>

            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                name="available"
                checked={available}
                onChange={handleOnchange}
                className="w-5 h-5 text-indigo-500 bg-gray-900 border-gray-700 rounded focus:ring-2 focus:ring-indigo-400"
              />
              <label className="ml-3 text-gray-300 font-semibold">Available</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-bold text-lg shadow-lg hover:scale-[1.02] transition-transform"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );

  
}
