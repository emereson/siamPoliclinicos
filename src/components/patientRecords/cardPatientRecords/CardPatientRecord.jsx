import React, { useState } from "react";

const CardPatientRecord = ({ patientRecord }) => {
  const [selectIds, setselectIds] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [validSelectId, setvalidSelectId] = useState();

  const handleSelectId = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="cardPatientRecord__container">
      <h2>{patientRecord.nom_eje}</h2>
      <button
        onClick={() => {
          setselectIds(true);
          setvalidSelectId(patientRecord.ide_eje);
        }}
      >
        Enviar Historias Clínicas A Mi Correo{" "}
      </button>
      {patientRecord.ide_eje === validSelectId ? (
        <div className="clinicHistory__selectedContianer">
          <h2>{patientRecord.nom_eje}</h2>
          <h3>seleccione sus historias clínicas disponibles</h3>
          <div className="clinicHistorySelectd__div">
            {patientRecord.his_cli_det
              .filter((clinicHistory) => clinicHistory.tne_pdf === true)
              .map((clinicHistory) => (
                <ul
                  className={
                    selectIds && selectedIds.includes(clinicHistory.ide_h_c)
                      ? "clinicHistorySelectd__ul selected"
                      : "clinicHistorySelectd__ul"
                  }
                  key={clinicHistory.ide_h_c}
                  onClick={() =>
                    selectIds && handleSelectId(clinicHistory.ide_h_c)
                  }
                >
                  <li className="clinicHistory__li">
                    Número de historia clínica: <p>{clinicHistory.nro_h_c}</p>
                  </li>
                  <li className="clinicHistory__li">
                    Fecha: <p>{clinicHistory.fch_h_c}</p>
                  </li>
                  <li className="clinicHistory__li">
                    Motivo: <p>{clinicHistory.des_mot}</p>
                  </li>
                  <li className="clinicHistory__li">
                    Puesto al que postula: <p>{clinicHistory.pto_pos}</p>
                  </li>
                </ul>
              ))}
          </div>
          <div className="clinicHistorySelectd__buttons">
            <button
              onClick={() => {
                setselectIds(false);
                setvalidSelectId("");
                setSelectedIds([]);
              }}
            >
              Cerrar
            </button>
            <button>Enviar </button>
          </div>
        </div>
      ) : (
        <div className="clinicHistory__container">
          {patientRecord.his_cli_det.map((clinicHistory) => (
            <ul className="clinicHistory__ul" key={clinicHistory.ide_h_c}>
              <li className="clinicHistory__li">
                Número de historia clínica: <p>{clinicHistory.nro_h_c}</p>
              </li>
              <li className="clinicHistory__li">
                Fecha: <p>{clinicHistory.fch_h_c}</p>
              </li>
              <li className="clinicHistory__li">
                Motivo: <p>{clinicHistory.des_mot}</p>
              </li>
              <li className="clinicHistory__li">
                Puesto al que postula: <p>{clinicHistory.pto_pos}</p>
              </li>
            </ul>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardPatientRecord;
