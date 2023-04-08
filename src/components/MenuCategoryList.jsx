import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MenuCategoryList() {
  const [menuCategories, setMenuCategories] = useState([]);

  useEffect(() => {
    getMenuCategory();
  }, []);

  const getMenuCategory = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/category`
    );
    setMenuCategories(response.data);
  };

  const deleteMenuCategory = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/category/${id}`);
    getMenuCategory();
  };

  return (
    <div>
      <div className="box mt-3 mr-3">
        <h1 className="title">Blog Category Table</h1>
        <h2 className="subtitle">List of Blog</h2>
        <Link to="/menu-category/add" className="button is-primary mb-3">
          Add New
        </Link>
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Menu Category Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {menuCategories.map((m, i) => (
              <tr key={m.id}>
                <td>{i + 1}</td>
                <td>{m.name}</td>
                <td>
                  <Link
                    to={`/menu-category/edit/${m.id}`}
                    className="button is-small is-info mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteMenuCategory(m.id)}
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
    </div>
  );
}

export default MenuCategoryList;
