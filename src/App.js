import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users.jsx";
import Menus from "./pages/Menus.jsx";
import Blog from "./pages/Blog";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import AddUser from "./pages/AddUser.jsx";
import EditUser from "./pages/EditUser.jsx";
import AddMenu from "./pages/AddMenu.jsx";
import EditMenu from "./pages/EditMenu.jsx";
import BlogCategory from "./pages/BlogCategory";
import AddBlogCategory from "./pages/AddBlogCategory";
import EditBlogCategory from "./pages/EditBlogCategory";
import MenuCategory from "./pages/MenuCategory";
import AddMenuCategory from "./pages/AddMenuCategory";
import EditMenuCategory from "./pages/EditMenuCategory";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/menus" element={<Menus />} />
          <Route path="/menus/add" element={<AddMenu />} />
          <Route path="/menus/edit/:id" element={<EditMenu />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/add" element={<AddBlog />} />
          <Route path="/blog/edit/:id" element={<EditBlog />} />
          <Route path="/blog-category" element={<BlogCategory />} />
          <Route path="/blog-category/add" element={<AddBlogCategory />} />
          <Route
            path="/blog-category/edit/:id"
            element={<EditBlogCategory />}
          />
          <Route path="menu-category" element={<MenuCategory />} />
          <Route path="menu-category/add" element={<AddMenuCategory />} />
          <Route path="menu-category/edit/:id" element={<EditMenuCategory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
