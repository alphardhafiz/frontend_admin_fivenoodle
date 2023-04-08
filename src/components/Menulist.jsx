import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MenuList() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/menu`); // koreksi
    setMenus(response.data);
  };

  const deleteMenu = async (menuId) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/menu/${menuId}`); // koreksi
    getMenus();
  };

  return (
    <div className="box mt-3 mr-3">
      <h1 className="title">Menu Table</h1>
      <h2 className="subtitle">List of Menu</h2>
      <Link to="/menus/add" className="button is-primary mb-3">
        Add New
      </Link>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Menu Name</th>
            <th>Calories</th>
            <th>Rating</th>
            <th>Nutri Score</th>
            <th>Image</th>
            <th>Menu Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu, index) => (
            <tr key={menu.id}>
              <td>{index + 1}</td>
              <td>{menu.name}</td>
              <td>{menu.calories}</td>
              <td>{menu.rating}</td>
              <td>{menu.nutriScore}</td>
              <td>
                <img style={{ height: "100px" }} src={menu.url} alt="" />
              </td>
              <td>{menu.menu_category.name}</td>

              <td>
                <Link
                  to={`/menus/edit/${menu.id}`}
                  className="button is-small is-info mr-3"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteMenu(menu.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenuList;
