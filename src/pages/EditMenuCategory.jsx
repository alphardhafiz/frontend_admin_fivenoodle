import React, { useEffect } from "react";
import Layout from "./Layout";
import FormEditMenuCategory from "../components/FormEditMenuCategory";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice.js";

function EditMenuCategory() {
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
    <Layout>
      <FormEditMenuCategory />
    </Layout>
  );
}

export default EditMenuCategory;
