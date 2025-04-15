import React from 'react'
import Home from '../Home';
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import IngestionControls from '../Components/IngestionControls';
import PreviewTable from '../Components/PreviewTable';
import ResultDisplay from '../Components/ResultDisplay';
import SourceSelector from '../Components/SourceSelector';
import StatusBar from '../Components/StatusBar';
import TableColumnSelector from '../Components/TableColumnSelector';

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // Main App component
        children: [
            {
                path: "/",
                element: <Home />, // Home component renders here
              },
              {
                path: "/IngestionControls",
                element: <IngestionControls />, 
              },
              {
                path: "/PreviewTable",
                element: <PreviewTable />, 
              },
              {
                path: "/ResultDisplay",
                element: <ResultDisplay />, 
              },
              {
                path: "/SourceSelector",
                element: <SourceSelector />, 
              },
              {
                path: "/StatusBar",
                element: <StatusBar />, 
              },
              {
                path: "/TableColumnSelector",
                element: <TableColumnSelector />, 
              },

        ],
    },
]);

export default Router