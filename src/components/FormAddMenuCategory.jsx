import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormAddMenuCategory() {
  const [menuCategoryName, setMenuCategoryName] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveMenuCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/category`, {
        name: menuCategoryName,
      });
      navigate("/menu-category");
    } catch (error) {
      if (error) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Blogs</h1>
      <h2 className="subtitle">Add New Blog</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveMenuCategory}>
              <p className="has-text-centered has-text-danger">{msg}</p>
              <div className="field">
                <label className="label">Menu Category Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={menuCategoryName}
                    onChange={(e) => setMenuCategoryName(e.target.value)}
                    placeholder="Menu Category Name"
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button px-6 mt-6 is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormAddMenuCategory;
