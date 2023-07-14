import axios from "axios";
import React, { useEffect, useState } from "react";
import "./bannerStyle.css";
import { useParams } from "react-router-dom";
import CardBanner from "./CardBanner";

const Banner = () => {
  const [banners, setbanners] = useState();
  const [carousel, setcarousel] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const url = `${import.meta.env.VITE_URL_GLOBAL}/web/banner/${id}/`;
    axios
      .get(url)
      .then((res) => {
        setbanners(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  setTimeout(() => {
    setcarousel(carousel + 1);
    if (carousel >= banners?.length - 1) {
      setcarousel(0);
    }
  }, 5000);

  const idCarousel = banners && banners[carousel]?.ide_ban;

  return (
    <div className="banner_container">
      <div className="cardBanner__container :nth-child(carousel)">
        {banners?.map((banner) => (
          <CardBanner
            key={banner.ide_ban}
            banner={banner}
            idCarousel={idCarousel}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
