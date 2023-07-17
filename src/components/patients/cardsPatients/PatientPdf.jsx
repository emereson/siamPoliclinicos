import React, { useState } from "react";

const PatientPdf = ({ pdf, patient }) => {
  const [viewPdf, setviewPdf] = useState(false);
  const [viewboneScan, setviewboneScan] = useState(false);
  const storedData = localStorage.getItem("access_token");

  const boneScans = patient.rad_det_all;
  console.log(patient);
  return (
    <div>
      {viewPdf ? (
        <div className="patientPdf__view">
          {!viewboneScan ? (
            <div className="patientPdf__relative">
              <iframe className="patient__iframe" src={pdf}></iframe>
              <div className="patiendPdf__data">
                <h3>{patient.nom_pac}</h3>
                <div className="patiendPdf__options">
                  <span onClick={() => setviewboneScan(true)}>
                    Ver Radiografias
                  </span>
                  <p
                    onClick={() => {
                      setviewPdf(false);
                      setviewboneScan(false);
                    }}
                  >
                    x
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="patientBoneScan__relative">
              <div className="patientBoneScan__img">
                {boneScans.length > 0 &&
                  boneScans.map((boneScan) => (
                    <img
                      key={boneScan.ide_img}
                      src={`http://192.168.1.192:3006/poli/radiografia-img/file/${boneScan.ide_img}?token=${storedData}`}
                      alt=""
                    />
                  ))}
              </div>
              <div className="patiendPdf__data">
                <h3>{patient.nom_pac}</h3>
                <div className="patiendPdf__options">
                  <span onClick={() => setviewboneScan(false)}>
                    Ver Informes Medico
                  </span>
                  <p onClick={() => setviewPdf(false)}>x</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <span
          className="patientPdf__viewInfomtaion"
          onClick={() => setviewPdf(true)}
        >
          ver Informe
        </span>
      )}
    </div>
  );
};

export default PatientPdf;
