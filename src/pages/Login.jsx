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
  const [token, setToken] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [tokenExists, setTokenExists] = useState(false);

  useEffect(() => {
    const checkToken = localStorage.getItem("access_token");
    if (checkToken) {
      setTokenExists(true);
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
        console.log(res.data);
        setToken(res.data.access_token);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("nom_com", res.data.nom_com);
        toast.success("Inicio de sesión exitoso");
        navigate(`/policlinicos/${id}/home`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Correo electrónico o contraseña incorrectos");
      });

    reset();
  };

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
          <input {...register("ccpassword")} id="ccpassword" type="text" />
        </div>
        <button>Iniciar sesión</button>
      </form>
      <MisionVision />
    </div>
  );
};

export default Login;
