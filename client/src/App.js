import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ActivationEmail from "./components/ActivationEmail";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { getToken } from "./redux/features/authSlice";
import { getAllUsers, getUser } from "./redux/features/userSlice";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import EditUser from "./components/EditUser";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getToken());
  }, []);
  useEffect(() => {
    if (token) dispatch(getUser(token));
  }, [token]);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/auth/activate/:activationToken"
            element={<ActivationEmail />}
          />
          <Route
            path="/forgot-password"
            element={token ? <Navigate to="/" /> : <ForgotPassword />}
          />
          <Route path="/auth/reset/:token" element={<ResetPassword />} />
          {token && <Route path="/profile" element={<Profile />} />}
          {user && user.role === "admin" && (
            <Route path="/edit-user/:id" element={<EditUser />} />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
