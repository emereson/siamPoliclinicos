import React from "react";
import CardPatientRecord from "./cardPatientRecords/CardPatientRecord";
import "./patientRecordStyle.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoaderPage from "../../pages/LoaderPage";

const PatientRecords = () => {
  const StoragePatientRecord = localStorage.getItem("patientRecords");
  const patientRecords = JSON.parse(StoragePatientRecord);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (patientRecords === null) {
      navigate(`/policlinicos/${id}/login`);
    }
  }, []);

  return (
    <div className="patientRecords__container">
      <LoaderPage />

      <header className="patientRecords__header">
        <h1>Tus Historias Clínicas</h1>
        <button onClick={handleClick}>Cerrar sesión</button>
      </header>
      {patientRecords?.his_cli_det.map((patientRecord) => (
        <CardPatientRecord
          key={patientRecord.ide_eje}
          patientRecord={patientRecord}
        />
      ))}
    </div>
  );
};

export default PatientRecords;
