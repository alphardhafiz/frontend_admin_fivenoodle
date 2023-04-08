import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddBlog = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(1);
  const [blogCategory, setBlogCategory] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  useEffect(() => {
    // loadImage();
    getBlogCategory();
  }, []);

  const getBlogCategory = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/blog-category`
    );
    setBlogCategory(response.data);
  };

  const saveBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Nama", name);
    formData.append("Deskripsi", description);
    formData.append("img", image);
    formData.append("Kategori", parseInt(category));

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/blog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/blog");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Blog Category</h1>
      <h2 className="subtitle">Add New Blog Category</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveBlog}>
              <p className="has-text-centered has-text-danger">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Blog Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label ">Image</label>
                <div className="control">
                  <div className="file">
                    <label className="file-label">
                      <input
                        className="input file-input"
                        type="file"
                        name="img"
                        onChange={loadImage}
                      />
                      <span className="file-cta">
                        <span className="file-label">
                          {image ? `${image.name}` : `Choose a file...`}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Category</label>
                <div className="select">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {blogCategory.map((b, i) => (
                      <option key={i} value={b.id}>
                        {b.Nama}
                      </option>
                    ))}
                  </select>
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

export default FormAddBlog;
