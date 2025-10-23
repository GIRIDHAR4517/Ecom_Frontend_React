import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    // Base classes applied to all links
    const linkBaseClasses = "font-bold transition-all duration-300 px-4 py-2 rounded-full text-lg whitespace-nowrap";
    
    // Functional class generator to handle active state dynamically
    const getLinkClass = ({ isActive }) => 
        isActive 
            // Active Link Style: Vibrant indigo background, white text, strong shadow
            ? `${linkBaseClasses} bg-indigo-600 text-white shadow-lg shadow-indigo-500/50`
            // Inactive Link Style: Subtle gray text, hover effect with cyan accent
            : `${linkBaseClasses} text-gray-300 hover:text-cyan-400 hover:bg-gray-700/50`;

    return (
        // Navbar Container: Fixed, full width, high Z-index to float above content
        <nav className='fixed top-0 w-full left-0 flex justify-center p-5 z-40'>
            {/* Navigation List: Rounded, dark semi-transparent background (glassmorphic), large shadow */}
            <ul className='flex gap-6 p-3 rounded-full 
                           bg-gray-800/70 backdrop-blur-lg 
                           shadow-2xl shadow-black/80 
                           border border-gray-700/50'>
                
                <NavLink to="/" className={getLinkClass}>
                    Home
                </NavLink>
                <NavLink to="/cart" className={getLinkClass}>
                    Cart
                </NavLink>
            </ul>
        </nav>
    );
};

export default Navbar; // Changed from named export to default export for better environment compatibility

