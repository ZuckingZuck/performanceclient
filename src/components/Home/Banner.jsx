import React from "react";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-container flex flex-col xl:flex-row justify-center gap-2 items-center py-16 px-32">
        <div className="banner-container-left">
          <img className="w-[100px]" src="assets/logo4.webp" alt="Logo"/>
        </div>
        <div className="banner-container-right text-center flex flex-col items-center gap-3">
          <p className="text-xl font-bold tracking-normal lg:tracking-wider">Instute of Project Support and Solidarity</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
