import React from "react";
import { Collapse } from "antd";

import { cityWeatherStore, unitSwitchStore } from "../../store";
import styles from "./ContentSection.module.less";
import { UnitsEnum } from "../../enums";

const ContentSection = () => {
  const { cityWeather } = cityWeatherStore();
  const { units } = unitSwitchStore();

  if (!cityWeather) {
    return null;
  }

  return (
    <div className={styles.content}>
      <div className={styles.contentBox}>
        <div className={styles.contentBoxText}>
          <Collapse
            items={[
              {
                key: "1",
                label: cityWeather.name,
                children: (
                  <div style={{ background: "transparent" }}>
                    {parseInt(cityWeather.main.temp, 10)}{" "}
                    <span>&deg;{units === UnitsEnum.Metric ? "C" : "F"}</span>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
