import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/authContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
