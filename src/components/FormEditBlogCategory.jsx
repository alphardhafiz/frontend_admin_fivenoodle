import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormAddBlogCategory = () => {
  const [blogCategoryName, setBlogCategoryName] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getBlogCategoryById = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/blog-category/${id}`
        );
        setBlogCategoryName(response.data.Nama);
      } catch (error) {
        setMsg(error.response.data.msg);
      }
    };
    getBlogCategoryById();
  }, [id]);

  const updateBlogCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/blog-category/${id}`,
        {
          Nama: blogCategoryName,
        }
      );
      navigate("/blog-category");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Blog Category</h1>
      <h2 className="subtitle">Edit Blog Category</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateBlogCategory}>
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
};

export default FormAddBlogCategory;
