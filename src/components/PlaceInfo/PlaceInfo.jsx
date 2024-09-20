import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { cityWeatherStore } from "../../store";
import styles from "./PlaceInfo.module.less";

const PlaceInfo = () => {
  const { placeId } = useParams();
  const { getCityFullInfo, cityWeather } = cityWeatherStore();

  useEffect(() => {
    getCityFullInfo({ id: placeId });
  }, [placeId, getCityFullInfo]);

  if (!cityWeather) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2>{cityWeather.name}</h2>
    </div>
  );
};

export default PlaceInfo;
