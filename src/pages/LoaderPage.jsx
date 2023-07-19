import React, { useState } from "react";

const LoaderPage = () => {
  const [closeloader, setcloseloader] = useState(true);

  const timer = setTimeout(() => {
    setcloseloader(false);
  }, 1000);
  return (
    <div className={closeloader ? "loaderPage__container" : "close__loader"}>
      <i class="bx bxs-donate-heart"></i>
      <span>Loading...</span>
    </div>
  );
};

export default LoaderPage;
