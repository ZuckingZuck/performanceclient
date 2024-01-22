import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Parser } from "html-to-react";
import useDocumentTitle from "../hooks/useDocumentTitle";

// ServiceContent bileşenini React.lazy ile yükle
const ServiceContent = lazy(() => import("./ServiceContent"));

const ServiceDetail = () => {
  const { slugUrl } = useParams();
  const [serviceDetail, setServiceDetail] = useState({});
  const [loading, setLoading] = useState(true);
  useDocumentTitle(`IPSS - ${serviceDetail.ServiceTitle}`);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/client/service/${slugUrl}`
      );
      const json = await response.json();
      if (response.ok) {
        setServiceDetail(json);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [slugUrl]);

  return (
    <div className="mt-10 mb-16 text-center flex justify-center xl:p-0 p-3">
      <div className="flex ipss-font max-w-4xl">
        <div className="container mx-auto my-8 flex flex-col items-center p-8 bg-gray-300 rounded shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{serviceDetail.ServiceTitle}</h1>
          <Suspense fallback={<div>Yükleniyor...</div>}>
            {!loading ? (
              <>
                <div className="rounded mb-5">
                  <img loading="lazy" className="rounded h-72 w-72 object-contain" src={serviceDetail.ContentImageUrl} alt="" />
                </div>
                {/* ServiceContent bileşenini burada gecikmeli olarak yükleyin */}
                <ServiceContent content={Parser().parse(serviceDetail.ServiceDescription)} />
                <div className="text-right text-gray-500 mt-2">
                  <NavLink to={"/contact"} className="bg-gray-900 text-white p-2 rounded">
                    İletişime Geç
                  </NavLink>
                </div>
              </>
            ) : null}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
