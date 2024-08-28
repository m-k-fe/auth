import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { reset, resetPassword } from "../redux/features/authSlice";

function ResetPassword() {
  const dispatch = useDispatch();
  const params = useParams();
  const { token } = params;
  const { success, error } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleResetPassword = () => {
    if (password === confirmPassword) {
      dispatch(resetPassword({ password, token }));
      dispatch(reset());
    }
  };
  return (
    <div className="forgot-password">
      <h2>Reset Your Password</h2>
      <div className="row">
        {error && <div className="err-msg">{error}</div>}
        {success && success.message && (
          <div className="success-msg">{success.message}</div>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirm-password">Enter your email adress</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" onClick={handleResetPassword}>
          Verify your email
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
