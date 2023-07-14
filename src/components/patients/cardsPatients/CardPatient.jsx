import React from "react";
import "../PatientsStyle/cardPatientStyle.css";

const CardPatient = ({ patient }) => {
  const newDate = patient.fch_h_c.substring(0, 10);

  return (
    <tr className="patient__tr">
      <td className="patient__td">{newDate}</td>
      <td className="patient__td patient__tdImg">
        <img src="./mision.png" alt="" style={{ width: "60px" }} />
      </td>
      <td className="patient__td">{patient.nro_h_c}</td>
      <td className="patient__td">{patient.nom_pac}</td>
      <td className="patient__td">{patient.pto_act}</td>
      <td className="patient__td">{patient.apt_des}</td>
      <td className="patient__td">{patient.obs_apt}</td>
      <td className="patient__td">{patient.flg_cer}</td>
      <td className="patient__td patient__noBorder">urlsrc</td>
    </tr>
  );
};

export default CardPatient;
