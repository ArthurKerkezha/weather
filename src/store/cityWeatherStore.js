import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { notification } from "antd";
import axios from "axios";

import { ImageService, WeatherService } from "../services";
import { filteredCityImages } from "../shared/utils";
import { unitSwitchStore } from "./unitSwitchStore";

export const cityWeatherStore = create()(
  devtools(
    immer((set) => ({
      cityImages: [
        "https://swiperjs.com/demos/images/nature-1.jpg",
        "https://swiperjs.com/demos/images/nature-2.jpg",
      ],
      cityWeather: null,
      citiesList: [],
      loadInitialCityInfo: async (query) => {
        const units = unitSwitchStore.getState().units;

        try {
          const [
            // placeImages,
            cityWeather,
          ] = await Promise.all([
            // ImageService.getPlaceImage(query),
            WeatherService.getCityWeatherData({ q: query, units }),
          ]);

          // const cityImages = await filteredCityImages(placeImages);

          set(
            {
              // cityImages,
              cityWeather,
            },
            undefined,
            "cityWeatherStore/loadInitialCityInfo",
          );
        } catch (e) {
          if (!axios.isCancel(e)) {
            notification.error({ message: e.message });
          }
        }
      },
      getCityFullInfo: async (params = {}) => {
        const units = unitSwitchStore.getState().units;

        try {
          const cityWeather = await WeatherService.getCityWeatherData({
            ...params,
            units,
          });

          // const placeImages = await ImageService.getPlaceImage(
          //   cityWeather.name,
          // );
          //
          // const cityImages = await filteredCityImages(placeImages);

          set(
            {
              // cityImages,
              cityWeather,
            },
            undefined,
            "cityWeatherStore/getCityFullInfo",
          );
        } catch (e) {
          if (!axios.isCancel(e)) {
            notification.error({ message: e.message });
          }
        }
      },
      getCitiesByQuery: async (query) => {
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
      clearCitiesList: () => {
        set(
          (state) => {
            state.citiesList = [];
          },
          undefined,
          "cityWeatherStore/clearCitiesList",
        );
      },
    })),
  ),
);
