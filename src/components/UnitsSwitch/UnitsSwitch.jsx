import React from "react";
import { Segmented } from "antd";

const UnitsSwitch = () => (
  <Segmented
    options={["Metric: °C, m/s", "Imperial: °F, mph"]}
    onChange={(value) => {
      console.log(value); // string
    }}
  />
);

export default UnitsSwitch;
