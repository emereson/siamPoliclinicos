import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./pagesStyle/LoginStyle.css";
import Banner from "../components/Baneer/Banner";
import MisionVision from "../components/visionAndMision/MisionVision";

const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formSlider, setformSlider] = useState(true);
  const [dniPatient, setdniPatient] = useState();
  const [emailPatient, setemailPatient] = useState();

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

  const handleSubmitPatient = (data) => {
    const input1 = data.target[0].value; // Accede al valor del campo de entrada date1
    const input2 = data.target[1].value; // Accede al valor del campo de entrada date2
    setdniPatient(input1);
    setemailPatient(input2);
  };

  useEffect(() => {
    const url = `http://192.168.1.192:3006/poli/funciones/fn_trae_historial_clinico/${dniPatient}/${emailPatient}`;
    if (dniPatient && emailPatient) {
      axios
        .get(url)
        .then((res) => {
          localStorage.setItem("patientRecords", JSON.stringify(res.data));
          navigate(`/policlinicos/${id}/registros-paciente`);
        })
        .catch((err) => {
          toast.error("Usuario o contraseña incorrectos");
        });
    }
  }, [dniPatient, emailPatient]);

  return (
    <div className="longin__container">
      <Banner />
      <ToastContainer />
      <div className="loginForm__container">
        <div className="login__wave"></div>
        <dir className="loginForm__img">
          <img src="/doctor3d.png" alt="" />
        </dir>
        <div className="loginForm__slider">
          <ul className="loginForm__ul">
            <li className="loginFormUl__animation">
              <span
                className="loginAnimation__span"
                style={
                  formSlider
                    ? { transform: "translatex(0)" }
                    : { transform: "translatex(100%)" }
                }
              ></span>
            </li>
            <li className="loginForm__li" onClick={() => setformSlider(true)}>
              Empresa
            </li>
            <li className="loginForm__li" onClick={() => setformSlider(false)}>
              Paciente
            </li>
          </ul>
          {formSlider ? <h2>Ingresar</h2> : <h2>Buscar</h2>}
          <div className="loginAllContainters__form">
            <form
              className="loginFom__polyclinic"
              onSubmit={handleSubmit(submit)}
              style={
                formSlider
                  ? { transform: "translatex(0)" }
                  : { transform: "translatex(-150%)" }
              }
            >
              <div className="longin__div">
                <label htmlFor="cidusuario">Usuario :</label>
                <input
                  {...register("cidusuario")}
                  id="cidusuario"
                  type="text"
                />
              </div>
              <div className="longin__div">
                <label htmlFor="ccpassword">Contraseña:</label>
                <input
                  {...register("ccpassword")}
                  id="ccpassword"
                  type="password"
                />
              </div>
              <button>Iniciar sesión</button>
            </form>
            <form
              className="clinical__histories"
              onSubmit={handleSubmitPatient}
              style={
                !formSlider
                  ? { transform: "translatex(0)" }
                  : { transform: "translatex(150%)" }
              }
            >
              <div className="longin__div">
                <label htmlFor="dniPatient">
                  Número de Documento <span>(DNI, otros)</span>
                </label>
                <input id="dniPatient" type="text" />
              </div>
              <div className="longin__div">
                <label htmlFor="emailPatient">Correo Electrónico:</label>
                <input id="emailPatient" type="email" />
              </div>
              <button>Buscar Registros Clínicos</button>
            </form>
          </div>
        </div>
      </div>

      <MisionVision />
    </div>
  );
};

export default Login;
