import React, { useState } from "react";

const LoaderPage = () => {
  const [closeloader, setcloseloader] = useState(true);

  const timer = setTimeout(() => {
    setcloseloader(false);
  }, 500);
  return (
    <div className={closeloader ? "loaderPage__container" : "close__loader"}>
      <i className="bx bxs-donate-heart"></i>
      <span>Loading...</span>
    </div>
  );
};

export default LoaderPage;
