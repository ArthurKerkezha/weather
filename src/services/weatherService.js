import {
  WEATHER_CITIES_LIST_DATA_API_URL,
  WEATHER_CURRENT_CITY_DATA,
} from "../constants";
import { UnitsEnum } from "../enums";
import { weatherInstance } from "../api";

class WeatherService {
  async getCitiesListWithWeatherData(query, units = UnitsEnum.Metric) {
    const { data } = await weatherInstance.get(
      WEATHER_CITIES_LIST_DATA_API_URL,
      {
        params: {
          q: query,
          units,
          appid: process.env.REACT_APP_OPEN_WEATHER_API,
        },
      },
    );

    return data;
  }

  async getCityWeatherData(params) {
    const { data } = await weatherInstance.get(WEATHER_CURRENT_CITY_DATA, {
      params: {
        ...params,
        appid: process.env.REACT_APP_OPEN_WEATHER_API,
      },
    });

    return data;
  }
}

const weatherService = new WeatherService();

export default weatherService;
