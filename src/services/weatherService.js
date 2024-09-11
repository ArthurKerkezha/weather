import axios from "axios";

import {
  WEATHER_CITY_DATA_API_URL,
  WEATHER_CURRENT_DATA,
  WEATHER_DIRECT_API_URL,
} from "../constants";

const defaultDirectResponseLimit = 5;
const defaultUnits = "metric";
const defaultExcludes = [].join(",");

class WeatherService {
  async getDirectGeocoding(query, limit = defaultDirectResponseLimit) {
    const { data } = await axios.get(WEATHER_DIRECT_API_URL, {
      params: {
        q: query,
        limit,
        appid: process.env.REACT_APP_OPEN_WEATHER_API,
      },
    });

    console.log(data);
    return data;
  }

  async getCitiesAndWeatherData(query, units = defaultUnits) {
    const { data } = await axios.get(WEATHER_CITY_DATA_API_URL, {
      params: {
        q: query,
        units,
        appid: process.env.REACT_APP_OPEN_WEATHER_API,
      },
    });

    return data;
  }

  async getCurrenWeatherData({
    lat,
    lon,
    excludes = defaultExcludes,
    units = defaultUnits,
  }) {
    const { data } = await axios.get(WEATHER_CURRENT_DATA, {
      params: {
        lat,
        lon,
        exclude: excludes,
        units,
        appid: process.env.REACT_APP_OPEN_WEATHER_API,
      },
    });

    return data;
  }
}

const weatherService = new WeatherService();

export default weatherService;
