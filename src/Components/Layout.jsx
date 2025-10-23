import React from 'react';
// FIX: The error is a build issue. While in many bundlers you can omit the extension,
// making the path explicit can sometimes resolve module resolution issues.
// Since the Navbar component was exported as a default export, this import is correct:
import Navbar from './Navbar'; 
import { Outlet } from 'react-router-dom';
import { UseAuth } from '../../Backend/UseAuth';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    return (
    
            <>
                <Navbar/>
                <UseAuth>
                    <Outlet/>
                    <Toaster/>
                    
                </UseAuth>
            </>
       
    );
};

export default Layout;
