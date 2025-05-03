// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="996697808643-pga0k2qlldkofi0nhlouv0q0arpprp60.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
