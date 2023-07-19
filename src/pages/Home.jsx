import React, { useEffect, useState } from "react";
import Banner from "../components/Baneer/Banner";
import "./pagesStyle/homeStyle.css";
import Patients from "../components/patients/Patients";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoaderPage from "./LoaderPage";

const Home = () => {
  const { id } = useParams();
  const storedEjeId = localStorage.getItem("ide_eje");
  const navigate = useNavigate();
  const [rotColor, setrotColor] = useState();

  useEffect(() => {
    if (id !== storedEjeId) {
      navigate(`/policlinicos/${storedEjeId}/home`);
    }
  }, [id, storedEjeId, navigate]);

  useEffect(() => {
    const url2 = `http://192.168.1.192:3006/poli/funciones/fn_obt_detalles_poli_web?ide_eje=${id}`;

    axios
      .get(url2)
      .then((res) => {
        setrotColor(res.data.colores_css);
        Object.entries(rotColor).forEach(([variable, valor]) => {
          document.documentElement.style.setProperty(variable, valor);
        });
      })
      .catch((err) => console.log(err));
  }, [rotColor]);

  return (
    <div className="home__container">
      <LoaderPage />
      <Banner />
      <Patients />
    </div>
  );
};

export default Home;
