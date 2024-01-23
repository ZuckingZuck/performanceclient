import React from "react";
import { NavLink } from "react-router-dom";
const Applications = () => {
  return (
    <div className="services mb-5 container mx-auto">
      <h2 className="text-center text-4xl font-semibold mb-10 tracking-wider">
        Başvurular
      </h2>
      <div className="p-5 md:p-0 grid-cols-1 lg:grid-cols-2 grid xl:grid-cols-2 text-center gap-10">
        <div>
          <NavLink to="/trainee-application" className="services-container-box">
            <img
              width={20}
              height={20}
              loading="lazy"
              alt="robocode"
              src={
                "assets/sonresim/edu.webp"
              }
            />
            <h3>Kursiyer Ol</h3>
          </NavLink>
        </div>
        <div>
          <NavLink to="/team-application" className="services-container-box">
            <img
              width={15}
              height={20}
              loading="lazy"
              alt="robocode"
              src={
                "assets/sonresim/join.webp"
              }
            />
            <h3>Ekibimize Katıl</h3>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Applications;
