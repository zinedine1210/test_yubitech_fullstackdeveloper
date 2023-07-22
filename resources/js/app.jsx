import './bootstrap';

import React from 'react';
import ReactDOM from "react-dom/client"
import { BrowserRouter } from 'react-router-dom';
import "sweetalert2/dist/sweetalert2.css"


import App from "./components/App"
import { MyProvider } from './context/MyProvider';

ReactDOM.createRoot(document.getElementById("app")).render(
    <BrowserRouter>
        <MyProvider>
            <App /> 
        </MyProvider>
    </BrowserRouter>
)