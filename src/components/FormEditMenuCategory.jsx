import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function FormEditMenuCategory() {
  const [menuCategoryName, setMenuCategoryName] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getMenuCategoryById = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/category/${id}`
        );
        setMenuCategoryName(response.data.name);
      } catch (error) {
        setMsg(error.response.data.msg);
      }
    };
    getMenuCategoryById();
  }, [id]);

  const updateMenuCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
        name: menuCategoryName,
      });
      navigate("/menu-category");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Menu Category</h1>
      <h2 className="subtitle">Edit Menu Category</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateMenuCategory}>
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
                    Update
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

export default FormEditMenuCategory;
