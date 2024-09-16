import React, { useState } from "react";
import { AimOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";

import { userLocationStore } from "../../store";

const UserLocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userLocation, setUserLocation } = userLocationStore((state) => state);

  const onClick = (e) => {
    e.stopPropagation();
    if (navigator.geolocation) {
      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setUserLocation({ latitude, longitude });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting user location:", error);

          notification.error({
            message: `Error getting user location:, ${error}`,
          });
        },
      );
    } else {
      notification.error({
        message: "Geolocation is not supported by this browser.",
      });
      console.error("Geolocation is not supported by this browser.");
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

export default UserLocation;
