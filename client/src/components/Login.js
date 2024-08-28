import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, reset } from "../redux/features/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ user, navigate }));
    dispatch(reset());
  };
  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <div className="err-msg">{error}</div>}
      {success && success.message && (
        <div className="success-msg">{success.message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Adress</label>
          <input
            type="text"
            placeholder="Enter email adress"
            id="email"
            value={user.email}
            name="email"
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            id="password"
            value={user.password}
            name="password"
            onChange={onChange}
          />
        </div>
        {loading ? (
          "Loading..."
        ) : (
          <div className="row">
            <button type="submit">Login</button>
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>
        )}
      </form>
      <p>
        New customer? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
