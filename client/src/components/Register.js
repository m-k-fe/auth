import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, reset } from "../redux/features/authSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password === user.confirmPassword) {
      dispatch(registerUser({ user, navigate }));
      dispatch(reset());
    }
  };
  return (
    <div className="login-page">
      <h2>Register</h2>
      {error && <div className="err-msg">{error}</div>}
      {success && success.message && (
        <div className="success-msg">{success.message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            id="name"
            value={user.name}
            name="name"
            onChange={onChange}
          />
        </div>
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
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            id="confirm-password"
            value={user.confirmPassword}
            name="confirmPassword"
            onChange={onChange}
          />
        </div>
        {loading ? (
          "Loading..."
        ) : (
          <div className="row">
            <button type="submit">Register</button>
          </div>
        )}
      </form>
      <p>
        Already an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
