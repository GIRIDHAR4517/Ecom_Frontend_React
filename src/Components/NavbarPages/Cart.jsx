import React from 'react';
import { useAuth } from '../../../Backend/UseAuth';
// Using specific icons for better functionality and look
import { IoAdd, IoRemove, IoTrashBinOutline } from 'react-icons/io5';

// Define a type for a cart item for clarity (assuming it has these properties)
// type CartItem = {
//   id: number | string;
//   name: string;
//   price: number;
//   quantity: number;
//   imageURL: string;
// };

export const Cart = () => {
  // Assume useAuth provides the cart items and the necessary manipulation functions
  const { cart, incrementQuantity, decrementQuantity, removeItem } = useAuth();

  // Helper function to calculate the total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 p-8 flex items-start justify-center">
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">Your Cart is Empty 🛒</h2>
          <p className="text-lg text-gray-400">Time to find some great items!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-8 border-b border-gray-700 pb-4">
          Shopping Cart ({cart.length} Items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List - Span 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700"
              >
                {/* Item Image */}
                <div className="w-24 h-24 flex-shrink-0 mb-4 sm:mb-0 sm:mr-6 rounded-lg overflow-hidden border border-gray-600">
                  {/* Using a placeholder image URL, replace with actual item.imageURL */}
                  <img
                    src={item.imageURL || 'https://via.placeholder.com/150'}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Details and Controls */}
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-white truncate max-w-xs">{item.name}</h2>
                    <p className="text-2xl font-bold text-teal-400">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">${item.price.toFixed(2)} / item</p>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-600 rounded-lg overflow-hidden">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="p-2 bg-gray-700 hover:bg-red-600 transition-colors text-white disabled:opacity-50"
                        disabled={item.quantity <= 1}
                        aria-label="Decrement quantity"
                      >
                        <IoRemove size={20} />
                      </button>
                      <span className="px-4 py-2 bg-gray-800 font-semibold text-lg">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="p-2 bg-gray-700 hover:bg-teal-500 transition-colors text-white"
                        aria-label="Increment quantity"
                      >
                        <IoAdd size={20} />
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-400 p-2 rounded-full transition-colors"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <IoTrashBinOutline size={24} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary/Checkout - Span 1 column on large screens */}
          <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 sticky top-4 self-start">
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-3">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-lg text-gray-300">
                <span>Subtotal ({cart.length} items)</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between text-lg text-gray-300">
                <span>Shipping</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="flex justify-between text-lg text-gray-300">
                <span>Tax (estimated)</span>
                <span>$0.00</span>
              </div>
            </div>

            <div className="border-t border-gray-700 my-4 pt-4">
              <div className="flex justify-between text-2xl font-bold text-teal-400">
                <span>Order Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            <button
              className="w-full mt-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg rounded-lg transition-colors shadow-lg shadow-teal-500/50"
              onClick={() => alert('Proceeding to Checkout!')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};