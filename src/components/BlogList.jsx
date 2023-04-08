import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/blog`); // koreksi
    setBlogs(response.data);
  };

  const deleteBlog = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/blog/${id}`); // koreksi
    getBlogs();
  };

  return (
    <div className="box mt-3 mr-3">
      <h1 className="title">Blog Table</h1>
      <h2 className="subtitle">List of Blog</h2>
      <Link to="/blog/add" className="button is-primary mb-3">
        Add New
      </Link>
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Blog Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Blog Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog.id}>
              <td>{index + 1}</td>
              <td>{blog.Nama}</td>
              <td>{blog.Deskripsi}</td>
              <td>
                <img src={blog.url} alt="" style={{ height: "100px" }} />
              </td>
              <td>{blog.blog_category.Nama}</td>
              {/* <td>{blog.}</td> */}
              <td>
                <Link
                  to={`/blog/edit/${blog.id}`}
                  className="button is-small is-info mr-3"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBlog(blog.id)}
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

export default BlogList;
