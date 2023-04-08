import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditMenu = () => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [rating, setRating] = useState("");
  const [nutriScore, setNutriScore] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState(1);
  const [menuCategories, setMenuCategories] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    const getMenuById = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/menu/${id}`
        ); // koreksi
        setName(response.data.name);
        setCalories(response.data.calories);
        setRating(response.data.rating);
        setNutriScore(response.data.nutriScore);
        setImg(response.data.img);
        setCategory(response.data.menuCategoryId);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getMenuById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("calories", calories);
    formData.append("rating", rating);
    formData.append("nutriScore", nutriScore);
    formData.append("img", img);
    formData.append("Kategori", parseInt(category));
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/menu/${id}`,
        formData,
        {
          // koreksi
          // name,
          // calories,
          // rating,
          // nutriScore,
          // img,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/menus");
    } catch (error) {
      if (error) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Edit Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered has-text-danger">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                          {/* {img ? `${img}` : `Choose a file...`} */}
                          {typeof img === "object" ? `${img.name}` : `${img}`}
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
                  <button className="button px-6 mt-6 is-success">
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

export default FormEditMenu;
