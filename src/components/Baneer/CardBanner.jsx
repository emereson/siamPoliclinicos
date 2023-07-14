import React from "react";
import { useParams } from "react-router-dom";

const CardBanner = ({ banner, idCarousel }) => {
  const { id } = useParams();
  const bannerImg = `${import.meta.env.VITE_URL_GLOBAL}/web/banner/${id}/${
    banner.rut_ban
  }`;
  return (
    <img
      src={bannerImg}
      alt=""
      className={
        idCarousel === banner.ide_ban ? "cardBanerImg" : "closeBanerImg"
      }
    />
  );
};

export default CardBanner;
