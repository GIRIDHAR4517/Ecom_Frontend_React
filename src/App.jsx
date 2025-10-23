import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout'
import { Home } from './Components/NavbarPages/Home'
import { Cart } from './Components/NavbarPages/Cart'
import { ProductPreview } from './Components/NavbarPages/ProductPreview'
import { AddProduct } from './Components/NavbarPages/AddProduct'

function App() {
 const router = createBrowserRouter([
  {
    path:"/",
     element:<Layout/>,
     children:[
      {index:true , element:<Home/>},
      {path:"/:id" , element:<ProductPreview/>},
      {path:"/cart" , element:<Cart/>},
      {path:"/addProduct" , element:<AddProduct/>}
      
      

     ]
    }
 ]
  
 )

  return (
   
      <RouterProvider router={router}/>
   
  )
}

export default App
