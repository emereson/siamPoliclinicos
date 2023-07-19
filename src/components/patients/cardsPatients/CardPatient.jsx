import React, { useState } from "react";
import "../PatientsStyle/cardPatientStyle.css";
import PatientPdf from "./PatientPdf";

const CardPatient = ({ patient }) => {
  const newDate = patient.fch_h_c.substring(0, 10);
  const [error, setError] = useState(false);
  const storedData = localStorage.getItem("access_token");

  const url = `${import.meta.env.VITE_URL_GLOBAL}/siam/personas/fot_per/${
    patient.ide_pac
  }/${patient.ide_pac}.png`;
  const pdf = `${import.meta.env.VITE_URL_GLOBAL}/poli/his_cli/file/${
    patient.ide_h_c
  }/${patient.ide_h_c}.pdf?token=${storedData}`;

  const handleImageError = () => {
    setError(true);
  };

  return (
    <tr className="patient__tr">
      <td className="patient__td">{newDate}</td>
      <td className="patient__td patient__tdImg">
        {error ? (
          <img src="/perfilUser.png" alt="" />
        ) : (
          <img
            src={url}
            alt=""
            style={{ width: "60px" }}
            onError={handleImageError}
          />
        )}
      </td>
      <td className="patient__td">{patient.nro_h_c}</td>
      <td className="patient__td">{patient.nom_pac}</td>
      <td className="patient__td">{patient.pto_act}</td>
      <td className="patient__td">{patient.apt_des}</td>
      <td className="patient__td">{patient.obs_apt}</td>
      <td className="patient__td">{patient.flg_cer}</td>
      <td className="patient__td patient__noBorder">
        <PatientPdf pdf={pdf} patient={patient} />
      </td>
    </tr>
  );
};

export default CardPatient;
