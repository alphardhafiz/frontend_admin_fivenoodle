import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogCategoryList = () => {
  const [blogCategories, setBlogCategories] = useState([]);

  useEffect(() => {
    getBlogCategory();
  }, []);

  const getBlogCategory = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/blog-category`
    );
    setBlogCategories(response.data);
  };

  const deleteBlogCategory = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/blog-category/${id}`);
    getBlogCategory();
  };

  return (
    <div className="box mt-3 mr-3">
      <h1 className="title">Blog Category Table</h1>
      <h2 className="subtitle">List of Blog</h2>
      <Link to="/blog-category/add" className="button is-primary mb-3">
        Add New
      </Link>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Blog Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogCategories.map((b, i) => (
            <tr key={b.id}>
              <td>{i + 1}</td>
              <td>{b.Nama}</td>
              <td>
                <Link
                  to={`/blog-category/edit/${b.id}`}
                  className="button is-small is-info mr-3"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBlogCategory(b.id)}
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
};

export default BlogCategoryList;
