import React, { useEffect } from "react";
import Layout from "./Layout";
import MenuCategoryList from "../components/MenuCategoryList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice.js";

function MenuCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <div>
      <Layout>
        <MenuCategoryList />
      </Layout>
    </div>
  );
}

export default MenuCategory;
