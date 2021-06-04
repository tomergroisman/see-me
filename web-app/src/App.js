import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return token ? <Home /> : <Login setToken={setToken} />;
}
