import React, { useState } from "react";
import "../PatientsStyle/cardPatientStyle.css";
import PatientPdf from "./PatientPdf";

const CardPatient = ({ patient }) => {
  const newDate = patient.fch_h_c.substring(0, 10);
  const [error, setError] = useState(false);
  const storedData = localStorage.getItem("access_token");

  const url = `http://192.168.1.192:3006/siam/personas/fot_per/${patient.ide_pac}/${patient.ide_pac}.png`;
  const pdf = `http://192.168.1.192:3006/poli/his_cli/file/${patient.ide_h_c}/${patient.ide_h_c}.pdf?token=${storedData}`;

  const handleImageError = () => {
    setError(true);
  };

  return (
    <tr className="patient__tr">
      <td className="patient__td">{newDate}</td>
      <td className="patient__td patient__tdImg">
        {error ? (
          <img
            src="https://thumbs.dreamstime.com/b/s%C3%ADmbolo-masculino-del-perfil-de-la-persona-usuario-vector-icono-avatar-en-pictograma-plano-glyph-color-117610378.jpg"
            alt=""
          />
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
