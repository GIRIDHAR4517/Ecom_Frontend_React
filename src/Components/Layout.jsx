import React from 'react';
// FIX: The error is a build issue. While in many bundlers you can omit the extension,
// making the path explicit can sometimes resolve module resolution issues.
// Since the Navbar component was exported as a default export, this import is correct:
import Navbar from './Navbar'; 
import { Outlet } from 'react-router-dom';
import { UseAuth } from '../../Backend/UseAuth';

const Layout = () => {
    return (
    
        <div className="bg-gray-900 min-h-screen font-sans">
            <Navbar/>
           
            <main className="pt-24 pb-8 px-5 w-[100%] rounded-2xl">
                <UseAuth>
                    <Outlet/>
                    
                </UseAuth>
            </main>
        </div>
    );
};

export default Layout;
