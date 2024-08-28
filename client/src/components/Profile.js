import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetPassword } from "../redux/features/authSlice";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../redux/features/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.user);
  const [data, setData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState("");
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const updateInfo = () => {
    user &&
      dispatch(
        updateUser({
          name: data.name ? data.name : user.name,
          avatar: avatar ? avatar : user.avatar,
          token,
        })
      );
  };
  const updatePassword = () => {
    dispatch(resetPassword({ password: data.password, token }));
  };
  const handleUpdate = () => {
    if (data.name || data.avatar) updateInfo();
    if (
      data.password &&
      data.confirmPassword &&
      data.password === data.confirmPassword
    )
      updatePassword();
  };
  useEffect(() => {
    if (token && user && user.role === "admin") dispatch(getAllUsers(token));
  }, [token, user]);
  return (
    <>
      <div className="profile-page">
        <div className="col-left">
          <h2>
            {user && user.role === "admin" ? "Admin Profile" : "User Profile"}
          </h2>
          <div className="avatar">
            <img src={user && user.avatar} alt={user && user._id} />
            <span>
              <i className="fa fa-camera"></i>
              <p>Change</p>
              <input type="file" name="file" id="file-up" />
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user && user.name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user && user.email}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={data.confirmPassword}
              onChange={onChange}
            />
          </div>
          <button onClick={handleUpdate}>Update</button>
        </div>
        <div className="col-right">
          <h2>{user && user.role === "admin" ? "Users" : "My Orders"}</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="customers">
              <thead>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Action</th>
              </thead>
              <tbody>
                {users &&
                  users.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        {item.role === "admin" ? (
                          <i className="fa fa-check" title="Admin"></i>
                        ) : (
                          <i className="fa fa-times" title="User"></i>
                        )}
                      </td>
                      <td>
                        <Link to={`/edit-user/${item._id}`}>
                          <i className="fa fa-edit" title="Edit"></i>
                        </Link>
                        <i
                          className="fa fa-trash"
                          title="Remove"
                          style={{ marginLeft: "8px" }}
                          onClick={() =>
                            dispatch(deleteUser({ token, id: item._id }))
                          }
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
