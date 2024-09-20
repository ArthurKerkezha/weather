import React, { useCallback, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

import { SearchSection, SwiperCarousel } from "./components";
import { cityWeatherStore } from "./store";
import { Loader } from "./shared/components";
import useLoading from "./hooks/useLoading";
import ContentSection from "./components/ContentSection";
import "./styles/app.less";

const defaultCity = "New York";

const App = () => {
  const { placeId } = useParams();
  const { cityImages, loadInitialCityInfo } = cityWeatherStore();
  const [loadInitialInfo, isLoading] = useLoading(loadInitialCityInfo);

  const onLoadCityInfo = useCallback(
    async (query) => {
      await loadInitialInfo(query);
    },
    [loadInitialInfo],
  );

  useEffect(() => {
    if (placeId) return;

    onLoadCityInfo(defaultCity);
  }, [placeId, onLoadCityInfo]);

  if (isLoading) {
    return (
      <div className="loader">
        <Loader fullscreen />
      </div>
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
