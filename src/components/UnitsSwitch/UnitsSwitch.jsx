import React from "react";
import { Segmented } from "antd";

import { useParams } from "react-router-dom";
import { cityWeatherStore, unitSwitchStore } from "../../store";
import { UnitLabelsEnum, UnitsEnum } from "../../enums";
import styles from "./UnitsSwitch.module.less";

const UnitsSwitch = () => {
  const { placeId } = useParams();
  const { units: unitValue, setUnits } = unitSwitchStore();
  const { cityWeather, getCityFullInfo } = cityWeatherStore();

  const params = placeId ? { id: placeId } : { q: cityWeather?.name };

  const options = Object.keys(UnitsEnum).map((unit) => ({
    label: UnitLabelsEnum[unit],
    value: unit,
  }));

  const onChange = async (value) => {
    console.log("units", value);
    setUnits(value);
    await getCityFullInfo(params);
  };

  return (
    <Segmented
      block
      value={unitValue}
      className={styles.switch}
      options={options}
      onChange={onChange}
    />
  );
};

export default UnitsSwitch;
