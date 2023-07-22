import React, { useEffect, useState } from "react";
import Banner from "../components/Baneer/Banner";
import "./pagesStyle/homeStyle.css";
import Patients from "../components/patients/Patients";
import { useParams, useNavigate } from "react-router-dom";
import LoaderPage from "./LoaderPage";

const Home = () => {
  const { id } = useParams();
  const storedEjeId = localStorage.getItem("ide_eje");
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== storedEjeId) {
      navigate(`/policlinicos/${storedEjeId}/home`);
    }
  }, [id, storedEjeId, navigate]);

  return (
    <div className="home__container">
      <LoaderPage />
      <Banner />
      <Patients />
    </div>
  );
};

export default Home;
