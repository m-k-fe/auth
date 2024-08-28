import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { activateEmail, reset } from "../redux/features/authSlice";

function ActivationEmail() {
  const dispatch = useDispatch();
  const params = useParams();
  const { activationToken } = params;
  const { success, error } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(activateEmail(activationToken));
    dispatch(reset());
  }, []);
  return (
    <div className="active-page">
      {error && <div className="err-msg">{error}</div>}
      {success && success.message && (
        <div className="success-msg">{success.message}</div>
      )}
    </div>
  );
}

export default ActivationEmail;
