import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./misionVisionStyle.css";

const MisionVision = () => {
  const [misionVision, setMisionVision] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_URL_GLOBAL}/web/mis-vis/${id}/`;
        const response = await axios.get(url);
        setMisionVision(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="misionVison__container">
      {misionVision ? (
        <>
          <img className="mision__img" src="./mision.png" alt="" />
          <div className="mision__container">
            <h1>Mision</h1>
            <div
              className="mision__div"
              dangerouslySetInnerHTML={{
                __html: misionVision && misionVision[0].mis_dat,
              }}
            ></div>
          </div>
          <img className="vision__img" src="./vision.png" alt="" />
          <div className="vision__container">
            <h1>Vision</h1>
            <div
              className="vision__div"
              dangerouslySetInnerHTML={{
                __html: misionVision && misionVision[0].vis_dat,
              }}
            ></div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default MisionVision;
