import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile from './components/Profile/Profile';



const router = createBrowserRouter([
  { path: "/", 
    element: <App /> 
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/*",
    element: <div className='flex flex-col justify-center items-center'>
                <h1>Page Does Not Exist</h1>
                <p>404 Not Found</p>
            </div>
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
