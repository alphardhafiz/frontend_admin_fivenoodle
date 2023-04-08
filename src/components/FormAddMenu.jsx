import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddMenu = () => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [rating, setRating] = useState("");
  const [nutriScore, setNutriScore] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState(1);
  const [menuCategories, setMenuCategories] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setImg(image);
  };

  useEffect(() => {
    getMenuCategory();
  }, []);

  const getMenuCategory = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/category`
    );
    setMenuCategories(response.data);
  };

  const saveProduct = async (e) => {
    e.preventDefault(); // agar page tidak reload saat submit
    const formData = new FormData();
    formData.append("name", name);
    formData.append("calories", calories);
    formData.append("rating", rating);
    formData.append("nutriScore", nutriScore);
    formData.append("img", img);
    formData.append("Kategori", parseInt(category));

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/menu`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/menus");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Menu</h1>
      <h2 className="subtitle">Add New Menu</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered has-text-danger">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Menu Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Calories</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Calories"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Rating</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Nutri Score</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Nutri Score"
                    value={nutriScore}
                    onChange={(e) => setNutriScore(e.target.value)}
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
                          {img ? `${img.name}` : `Choose a file...`}
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
                    {menuCategories.map((menuCategory, i) => (
                      <option key={i} value={menuCategory.id}>
                        {menuCategory.name}
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

export default FormAddMenu;
