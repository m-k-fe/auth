import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../redux/features/authSlice";

function Header() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const handleLogOut = () => {
    dispatch(logOut());
  };
  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">DevAT*Shop</Link>
        </h1>
      </div>
      <ul style={{ transform: `translateY(${token ? -5 : 0}px)` }}>
        <li>
          <Link to="/">
            <i className="fa fa-shopping-cart"></i> Cart
          </Link>
        </li>
        {token ? (
          <li className="drop-nav">
            <Link to="/" className="avatar">
              <img src={user && user.avatar} alt={user && user._id} />{" "}
              <i className="fa fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
              <li>
                <Link to="/profile">Profile</Link>
                <Link to="/" onClick={handleLogOut}>
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <i className="fa fa-user"></i> Login
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
