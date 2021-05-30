import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return <Home />;
  // return !token ? <Home /> : <Login setToken={setToken} />;
}
