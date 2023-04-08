import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoPricetag,
  IoHome,
  IoLogOut,
  IoNewspaper,
} from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Logout, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(Logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <div>
      <aside className="menu pt-4 pl-4 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome className="mr-1" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/menus"}>
              <IoPricetag className="mr-2" /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to={"/menu-category"}>
              <IoPricetag className="mr-2" /> Menu Category
            </NavLink>
          </li>
          <li>
            <NavLink to={"/blog"}>
              <IoNewspaper className="mr-2" /> Blog
            </NavLink>
          </li>
          <li>
            <NavLink to={"/blog-category"}>
              <IoNewspaper className="mr-2" /> Blog Category
            </NavLink>
          </li>
          <li>
            <NavLink to={"/users"}>
              <IoPerson className="mr-2" /> Users
            </NavLink>
          </li>
        </ul>

        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-danger is-light">
              <IoLogOut className="mr-2" /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
