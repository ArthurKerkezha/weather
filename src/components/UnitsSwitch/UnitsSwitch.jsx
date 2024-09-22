import React from "react";
import { Segmented } from "antd";

import { cityWeatherStore, unitSwitchStore } from "../../store";
import { UnitLabelsEnum, UnitsEnum } from "../../enums";
import styles from "./UnitsSwitch.module.less";

const UnitsSwitch = () => {
  const { units: unitValue, setUnits } = unitSwitchStore();
  const { cityWeather, getCityFullInfo } = cityWeatherStore();

  const options = Object.keys(UnitsEnum).map((unit) => ({
    label: UnitLabelsEnum[unit],
    value: unit,
  }));

  const onChange = async (value) => {
    setUnits(value);

    await getCityFullInfo({ q: cityWeather?.name });
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
