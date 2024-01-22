import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Parser } from "html-to-react";
import useDocumentTitle from "../hooks/useDocumentTitle";
const ServiceDetail = () => {
  const { slugUrl } = useParams();
  const [serviceDetail, setServiceDetail] = useState({});
  useDocumentTitle(`IPSS - ${serviceDetail.ServiceTitle}`)
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/client/service/${slugUrl}`
      );
      const json = await response.json();
      if (response.ok) {
        setServiceDetail(json);
      }
    };

    fetchPosts();
  }, [slugUrl]);

  return (
    <div className="mt-10 mb-16 text-center flex justify-center xl:p-0 p-3">
      <div className="flex ipss-font max-w-4xl">
        <div className="container mx-auto my-8 flex flex-col items-center p-8 bg-gray-300 rounded shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{serviceDetail.ServiceTitle}</h1>
          <div className="rounded mb-5">
            <img className="rounded h-72 w-72 object-contain" src={serviceDetail.ContentImageUrl} alt="" />
          </div>
          <div className="mb-4 text-lg">{Parser().parse(serviceDetail.ServiceDescription)}</div>
          <div className="text-right text-gray-500 mt-2">
            <NavLink to={"/contact"} className="bg-gray-900 text-white p-2 rounded">
              İletişime Geç
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
