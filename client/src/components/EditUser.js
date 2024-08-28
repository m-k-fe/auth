import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editRole } from "../redux/features/userSlice";

function EditUser() {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { users } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const [editUser, setEditUser] = useState({});
  const [checkAdmin, setCheckAdmin] = useState(false);
  const handleUpdate = () => {
    dispatch(editRole({ role: checkAdmin ? "admin" : "user", token, id }));
  };
  useEffect(() => {
    users &&
      users.forEach((item) => {
        if (item._id === id) {
          setEditUser(item);
          setCheckAdmin(item.role === "admin" ? true : false);
        }
      });
  }, [users, id]);
  return (
    <div className="profile-page edit-user">
      <div className="row">
        <Link to="/profile">
          <i className="fa fa-long-arrow-alt-left"></i> Go Back
        </Link>
      </div>
      <div className="col-left">
        <h2>Edit User</h2>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={editUser.name}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={editUser.email}
            disabled
          />
        </div>

        <div className="form-group">
          <input
            type="checkbox"
            id="isAdmin"
            checked={checkAdmin}
            onChange={() => setCheckAdmin(!checkAdmin)}
          />
          <label htmlFor="isAdmin">isAdmin</label>
        </div>

        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}

export default EditUser;
