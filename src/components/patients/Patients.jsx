import axios from "axios";
import React, { useEffect, useState } from "react";
import CardPatient from "./cardsPatients/CardPatient";
import { ToastContainer, toast } from "react-toastify";
import "./PatientsStyle/patientsStyle.css";
import ReactSelect from "react-select";
import getToken from "../getToken";

const Patients = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [dataLogin, setDataLogin] = useState(null);
  const [patients, setpatients] = useState();
  const [date1, setdate1] = useState(currentDate);
  const [date2, setdate2] = useState(currentDate);
  const [dni, setdni] = useState();
  const [providers, setProviders] = useState();
  const [providersName, setProvidersName] = useState();
  const token = getToken();
  const validDate = date2.replace(/-/g, "") - date1.replace(/-/g, "");

  const handleSubmitProviders = (selectedOption) => {
    setProviders(selectedOption.value);
    setProvidersName(selectedOption);
  };

  const options = dataLogin?.proveedores.map((proveedor) => ({
    value: proveedor.ide_prv,
    label: proveedor.nom_cli,
  }));

  useEffect(() => {
    if (providers) {
      const url = `${
        import.meta.env.VITE_URL_GLOBAL
      }/poli/poli-vistas/vw_his_cli_web_plus?fch_ini=${date1}&fch_fin=${date2}&ide_prv=${providers}${
        dni ? `&dni_pac=${dni}` : ""
      }`;

      if (validDate > 15) {
        toast.error(
          "El rango de las fechas no debe ser mayor de 15 dias  📌",

          {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          }
        );
      } else {
        axios
          .get(url, token)
          .then((res) => {
            if (!res.data) {
              res.data = [];
              toast.error(
                "No se encontro ningun registro  📌",

                {
                  position: "top-right",
                  autoClose: 2000,
                  theme: "dark",
                }
              );
            }
            setpatients(res.data);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [date1, date2, providers, dni]);

  useEffect(() => {
    const storedData = localStorage.getItem("data_Login");
    if (storedData) {
      const data = JSON.parse(storedData);
      setDataLogin(data);
      setTimeout(() => {
        setProviders(data?.proveedores[0]?.ide_prv);
        localStorage.setItem("ide_eje", data.ide_eje);
      }, 0);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input1 = e.target[0].value;
    const input2 = e.target[1].value;

    if (input1 > input2) {
      toast.error(
        "🧨La Fecha de Inicio no puede ser mayor a la Fecha final🧨 psdt: no seas gil 😈",

        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return;
    }

    setdate1(input1);
    setdate2(input2);
    setdni("");
  };

  const handleSubmitDni = (e) => {
    e.preventDefault();
    const input = e.target[0].value;
    setdni(input);
  };

  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="patients__container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <section className="patients__welcome">
        <div className="patientsWelcome__data">
          <div className="patienetsWelcome__name">
            <h4>¡Bienvenido!</h4>
            <h3>{dataLogin?.nom_com}</h3>
          </div>
          <button onClick={handleClick}>Cerrar sesión</button>
        </div>
      </section>
      <div className="patients__providers">
        <h3>Seleccionar Proveedor:</h3>
        <ReactSelect
          className="patientsProviders__select"
          options={options}
          value={providersName}
          placeholder={dataLogin?.proveedores[0].nom_cli}
          onChange={handleSubmitProviders}
        />
      </div>
      <div className="seacrh__parients">
        <div className="parients__dni">
          <h3>Filtrar port DNI:</h3>
          <form className="parientsDni__form" onSubmit={handleSubmitDni}>
            <input id="input__dni" placeholder={"dni:12345678"} maxLength={8} />
            <button>Buscar</button>
          </form>
        </div>
        <div className="parients__dates">
          <h3>Filtrar por fechas</h3>
          <form className="patientsDates__form" onSubmit={handleSubmit}>
            <div>
              <span>Fecha de Inicio:</span>
              <input type="date" defaultValue={date1} />
            </div>
            <div>
              <span>Fecha Final:</span>
              <input type="date" defaultValue={date2} />
            </div>
            <button type="submit">buscar</button>
          </form>
        </div>
      </div>
      <table className="patients__table">
        <thead className="patients__thead">
          <tr className="patients__tr">
            <th className="patients__th">Fecha</th>
            <th className="patients__th">Foto</th>
            <th className="patients__th">N° Ficha</th>
            <th className="patients__th">Paciente</th>
            <th className="patients__th">Puesto</th>
            <th className="patients__th">Aptitud</th>
            <th className="patients__th">Obs. Aptitud</th>
            <th className="patients__th">Estado</th>
            <th className="patients__th patient__noBorder">Informes Médicos</th>
          </tr>
        </thead>
        <tbody className="patients__tbody">
          {patients?.map((patient) => (
            <CardPatient key={patient.ide_h_c} patient={patient} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
