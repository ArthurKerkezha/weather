import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { notification } from "antd";
import axios from "axios";

import { ImageService, WeatherService } from "../services";
import { filteredCityImages } from "../shared/utils";
import { CITY_WEATHER_KEY } from "../constants";
import { unitSwitchStore } from "./unitSwitchStore";

export const cityWeatherStore = create()(
  devtools(
    immer((set, getState) => ({
      isLoading: false,
      cityImages: [],
      cityWeather: null,
      citiesList: [],
      loadInitialCityInfo: async (query) => {
        set({ initialLoading: true });
        const units = unitSwitchStore.getState().units;

        try {
          const [placeImages, cityWeather] = await Promise.all([
            ImageService.getPlaceImage(query),
            WeatherService.getCityWeatherData({ q: query, units }),
          ]);

          const cityImages = await filteredCityImages(placeImages);

          set(
            {
              cityImages,
              cityWeather,
            },
            undefined,
            "cityWeatherStore/loadInitialCityInfo",
          );
        } catch (e) {
          if (!axios.isCancel(e)) {
            notification.error({ message: e.message });
          }
        } finally {
          set({ initialLoading: false });
        }
      },
      getCityFullInfo: async (params = {}) => {
        set({ isLoading: true });
        const units = unitSwitchStore.getState().units;

        try {
          const cityWeather = await WeatherService.getCityWeatherData({
            ...params,
            units,
          });

          localStorage.setItem(CITY_WEATHER_KEY, cityWeather.name);

          const placeImages = await ImageService.getPlaceImage(
            cityWeather.name,
          );

          const cityImages = await filteredCityImages(placeImages);

          set(
            { cityWeather, cityImages },
            undefined,
            "cityWeatherStore/getCityFullInfo",
          );
        } catch (e) {
          if (!axios.isCancel(e)) {
            notification.error({ message: e.message });
          }
        } finally {
          set({ isLoading: false });
        }
      },
      getCitiesByQuery: async (query) => {
        if (query.length <= 3) {
          set({ citiesList: [] });

          return;
        }

        const units = unitSwitchStore.getState().units;

        try {
          const { list } = await WeatherService.getCitiesListWithWeatherData(
            query,
            units,
          );

          set(
            { citiesList: list },
            undefined,
            "cityWeatherStore/getCitiesByQuery",
          );
        } catch (e) {
          notification.error({ message: e.message });
        }
      },
    })),
  ),
);
