import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Table from "./pages/Table";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from "./components/NavBars";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Verify from "./users/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
const App = () => {
  const getUserFromLocalStorage = () => {
    const userInfo = localStorage.getItem("user");
    return userInfo ? JSON.parse(userInfo) : null;
  };
  const RedirectToLogin = () => {
    return <Navigate to="/login" />;
  };
  //save to local
  const saveUserToLocalStorage = (userInfo) => {
    if (userInfo) {
      localStorage.setItem("user", JSON.stringify(userInfo));
      console.log(localStorage.getItem('user'));
      setUser(userInfo);
    } else {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const [user, setUser] = useState(getUserFromLocalStorage());
  const PublicRoute = () => {
    return user ? <Navigate to="/" /> : <Outlet />;
  };

  // Component for private routes
  const PrivateRoute = () => {
    return user ? (
      <>
        <AdminNavbar user={user} saveUser={saveUserToLocalStorage} setUser={setUser} />
        <Outlet />
      </>
    ) : (
      <Navigate to="/login" />
    );
  };
  return (
    <div className="container">
    <Router basename="/Ecommerce-Web-ShopAppPEUS">
      <Routes>
      <Route path="/" element={user ? <Navigate to="/" /> : <RedirectToLogin />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Register saveUser={saveUserToLocalStorage} />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login saveUser={saveUserToLocalStorage} />} />
         
        </Route>

        <Route element={<PrivateRoute />}>
        <Route path="/Table" element={<Table />} />

        

        </Route>
      </Routes>
    </Router>
  </div>
  );
};

export default App;
