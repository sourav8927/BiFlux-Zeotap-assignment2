import React from 'react'
import Home from '../Home';
import { createBrowserRouter } from "react-router-dom";
import App from '../App';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // Main App component
        children: [
            {
                path: "/",
                element: <Home />, // Home component renders here
              },
        ],
    },
]);

export default Router