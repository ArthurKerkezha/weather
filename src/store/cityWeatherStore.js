import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

import { ImageService, WeatherService } from "../services";
import { loadImageSrc } from "../shared/utils";
import { unitSwitchStore } from "./unitSwitchStore";

const defaultCity = "New York";

export const cityWeatherStore = create()(
  devtools(
    immer((set) => ({
      isLoading: false,
      cityImages: [],
      cityWeather: null,
      getInitialCityFullInfo: async (query) => {
        const unit = unitSwitchStore.getState().unit;

        console.log("inside getInitialCityFullInfo", unit);
        try {
          set({ isLoading: true });

          const [currentCities, cityWeather] = await Promise.all([
            ImageService.getPlaceImage(query || defaultCity),
            WeatherService.getCitiesAndWeatherData(query || defaultCity, unit),
          ]);

          const filteredCityImages = currentCities.filter(
            (city) => city?.imageUrl,
          );

          const cityImages = await Promise.all(
            filteredCityImages.map((city) => loadImageSrc(city.imageUrl)),
          );

          set(
            {
              cityImages,
              cityWeather: cityWeather.list.at(0),
            },
            undefined,
            "cityWeatherStore/getCurrentCityInfo",
          );
        } catch (e) {
          console.log("error", e);
        } finally {
          set({ isLoading: false });
        }
      },
    })),
  ),
);
