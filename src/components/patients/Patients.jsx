import axios from "axios";
import React, { useEffect, useState } from "react";
import tokenCofig from "../../utils/tokenConfig";
import CardPatient from "./cardsPatients/cardPatient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PatientsStyle/patientsStyle.css";

const Patients = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [patients, setpatients] = useState();
  const [date1, setdate1] = useState(currentDate);
  const [date2, setdate2] = useState(currentDate);

  useEffect(() => {
    const url = `http://192.168.1.192:3006/poli/poli-vistas/vw_his_cli_web_plus?fch_ini=${date1}&fch_fin=${date2}`;
    // &dni_pac=46676013

    axios
      .get(url, tokenCofig)
      .then((res) => {
        setpatients(res.data);
      })
      .catch((err) => console.log(err));
  }, [date1, date2]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input1 = e.target[0].value;
    const input2 = e.target[1].value;

    // Validar que date1 no sea mayor que date2
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
  };

  console.log(date1, date2);
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
      <div className="parients__dates">
        <h3>Buscar por fechas</h3>
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
      <table className="patients__table">
        <thead className="patients__thead">
          <tr className="patients__tr">
            <th className="patients__th">Fecha</th>
            <th className="patients__th">Foto</th>
            <th className="patients__th">Paciente</th>
            <th className="patients__th">N° Ficha</th>
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
