import React from "react";
import MisionVision from "../components/visionAndMision/MisionVision";
import Banner from "../components/Baneer/Banner";
import "./pagesStyle/homeStyle.css";
import Patients from "../components/patients/Patients";

const Home = () => {
  return (
    <div className="home__container">
      <Banner />
      <Patients />
      <MisionVision />
    </div>
  );
};

export default Home;
