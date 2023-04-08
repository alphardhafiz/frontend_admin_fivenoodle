import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddBlogCategory = () => {
  const [blogCategoryName, setBlogCategoryName] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveBlogCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/blog-category`, {
        Nama: blogCategoryName,
      });
      navigate("/blog-category");
    } catch (error) {
      if (error.response) {
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
            <form onSubmit={saveBlogCategory}>
              <p className="has-text-centered has-text-danger">{msg}</p>
              <div className="field">
                <label className="label">Blog Category Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={blogCategoryName}
                    onChange={(e) => setBlogCategoryName(e.target.value)}
                    placeholder="Blog Category Name"
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
};

export default FormAddBlogCategory;
