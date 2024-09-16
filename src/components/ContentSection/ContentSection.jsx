import React from "react";

import { Collapse } from "antd";
import styles from "./ContentSection.module.less";
import { cityWeatherStore } from "../../store";

const ContentSection = () => {
  const { cityWeather } = cityWeatherStore();

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
                    {parseInt(cityWeather.main.temp, 10)} <span>&deg;C</span>
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
