import React from "react";
import { Segmented } from "antd";

import { unitSwitchStore } from "../../store";
import { UnitLabelsEnum, UnitsEnum } from "../../enums";
import styles from "./UnitsSwitch.module.less";

const UnitsSwitch = () => {
  const { unit: unitValue, setUnit } = unitSwitchStore();

  const options = Object.keys(UnitsEnum).map((unit) => ({
    label: UnitLabelsEnum[unit],
    value: unit,
  }));

  const onChange = (value) => setUnit(value);

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
