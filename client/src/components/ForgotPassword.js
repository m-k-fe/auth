import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, reset } from "../redux/features/authSlice";

function ForgotPassword() {
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const handleForgotPassword = () => {
    dispatch(forgotPassword(email));
    dispatch(reset());
  };
  return (
    <div className="forgot-password">
      <h2>Forgot Your Password</h2>
      <div className="row">
        {error && <div className="err-msg">{error}</div>}
        {success && success.message && (
          <div className="success-msg">{success.message}</div>
        )}
        <label htmlFor="email">Enter your email adress</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" onClick={handleForgotPassword}>
          Verify your email
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
