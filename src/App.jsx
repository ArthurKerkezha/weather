import React, { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { ContentSection, SearchSection, SwiperCarousel } from "./components";
import { cityWeatherStore, unitSwitchStore } from "./store";
import "./styles/app.less";

const App = () => {
  const { cityImages, isLoading, getInitialCityFullInfo } = cityWeatherStore();

  const onSearchCityImage = useCallback(async () => {
    await getInitialCityFullInfo();
  }, [getInitialCityFullInfo]);

  useEffect(() => {
    onSearchCityImage();
  }, [onSearchCityImage]);

  if (isLoading) {
    return (
      <h2 style={{ position: "absolute", top: "50%", left: "50%" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div className="pos-r">
      <SwiperCarousel images={cityImages}>
        <SearchSection />
      </SwiperCarousel>
      <ContentSection />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
