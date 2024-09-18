import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import ContentSection from "../ContentSection";
import { cityWeatherStore } from "../../store";
import useLoading from "../../hooks/useLoading";
import { Loader } from "../../shared/components";

const PlaceInfo = () => {
  const { placeId } = useParams();
  const { getCityFullInfo } = cityWeatherStore();
  const [loadCityFullInfo, isLoading] = useLoading(getCityFullInfo);

  useEffect(() => {
    console.log("effect PlaceInfo");

    loadCityFullInfo({ id: placeId });
  }, [placeId, loadCityFullInfo]);

  if (isLoading) {
    return <Loader />;
  }

  return <ContentSection />;
};

export default PlaceInfo;
