import React, { useState } from "react";
import propTypes from "prop-types";
import { AimOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";

import { cityWeatherStore, userLocationStore } from "../../store";

const UserLocation = ({ onClear }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserLocation } = userLocationStore();
  const { getCityFullInfo } = cityWeatherStore();

  const onClick = (e) => {
    e.stopPropagation();

    if (navigator.geolocation) {
      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          setUserLocation({ latitude, longitude });

          await getCityFullInfo({ lat: latitude, lon: longitude });

          if (onClear) {
            onClear();
          }
          setIsLoading(false);
        },
        (error) => {
          notification.error({
            message: `Error getting user location:, ${error}`,
          });
        },
      );
    } else {
      notification.error({
        message: "Geolocation is not supported by this browser.",
      });
    }
  };

  return (
    <Button
      type="text"
      loading={isLoading}
      icon={<AimOutlined />}
      onClick={onClick}
    />
  );
};

UserLocation.propTypes = {
  onClear: propTypes.func,
};

UserLocation.defaultProps = {
  onClear: null,
};
export default UserLocation;
