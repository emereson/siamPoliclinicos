import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Banner from "../components/Baneer/Banner";
import MisionVision from "../components/visionAndMision/MisionVision";
import "./pagesStyle/loginStyle.css";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [rotColor, setrotColor] = useState();

  useEffect(() => {
    const checkToken = localStorage.getItem("access_token");
    if (checkToken) {
      navigate(`/policlinicos/${id}/home`);
    }
  }, [id, navigate]);

  const submit = (data) => {
    const url = `${import.meta.env.VITE_URL_GLOBAL}/siam/usuarios/login`;

    const requestData = {
      ...data,
      login: "clientes_vip",
      ide_eje: `${id}`,
    };
    axios
      .post(url, requestData)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("nom_com", res.data.nom_com);
        localStorage.setItem("ide_eje", res.data.data_Login);
        localStorage.setItem("data_Login", JSON.stringify(res.data));
        navigate(`/policlinicos/${id}/home`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Usuario o contraseña incorrectos");
      });

    reset();
  };
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
  }, []);

  return (
    <div className="longin__container">
      <Banner />
      <ToastContainer />
      <form className="longin__form" onSubmit={handleSubmit(submit)}>
        <div className="login__wave"></div>
        <h2>Ingresar</h2>
        <div className="longin__div">
          <label htmlFor="cidusuario">Usuario :</label>
          <input {...register("cidusuario")} id="cidusuario" type="text" />
        </div>
        <div className="longin__div">
          <label htmlFor="ccpassword">Contraseña:</label>
          <input {...register("ccpassword")} id="ccpassword" type="password" />
        </div>
        <button>Iniciar sesión</button>
      </form>
      <MisionVision />
    </div>
  );
};

export default Login;
