import React from "react";
import { Card, Col, Image, Row } from "antd";

import { cityWeatherStore, unitSwitchStore } from "../../store";
import { UnitsEnum } from "../../enums";
import { parsedInt } from "../../shared/utils";
import { Loader } from "../../shared/components";
import styles from "./ContentSection.module.less";

const ContentSection = () => {
  const { isLoading, cityWeather } = cityWeatherStore();
  const { units } = unitSwitchStore();

  const unit = units === UnitsEnum.Metric ? "°C" : "°F";
  const wind = units === UnitsEnum.Metric ? "m/s" : "mph";

  if (!cityWeather) return null;

  return (
    <div className={styles.content}>
      <Card
        className={styles.contentCard}
        bordered={false}
        type="inner"
        title={
          <div className="d-f ai-c jc-sa">
            <h2>{cityWeather.name}</h2>
            <div>
              {parsedInt(cityWeather.main.temp)} {unit}
            </div>
            <Image
              preview={false}
              src={`https://openweathermap.org/img/wn/${cityWeather?.weather[0].icon}@2x.png`}
              alt={cityWeather?.weather[0].description}
            />
          </div>
        }
      >
        {isLoading && <Loader />}

        <Row gutter={[10, 10]} justify="space-around" align="middle">
          <Col className="text-center" xs={24} sm={24} md={12}>
            Feels Like: {parsedInt(cityWeather.main.feels_like)} {unit}
          </Col>
          <Col className="text-center" xs={24} sm={24} md={12}>
            Wind Speed: {cityWeather.wind.speed} {wind}
          </Col>
          <Col className="text-center" xs={24} sm={24} md={12}>
            Humidity: {cityWeather.main.humidity} %
          </Col>
          <Col className="text-center" xs={24} sm={24} md={12}>
            Weather: {cityWeather.weather[0].description}
          </Col>
          <Col className="text-center" xs={24} sm={24} md={12}>
            Cloudiness: {cityWeather.clouds.all} %
          </Col>
          <Col className="text-center" xs={24} sm={24} md={12}>
            Pressure: {cityWeather.main.pressure} hPa
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ContentSection;
