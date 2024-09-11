import React, { useState } from "react";
import { Button, Dropdown } from "antd";
import { isEmpty } from "lodash";
import { Link, Outlet } from "react-router-dom";

import { SmileOutlined } from "@ant-design/icons";
import { BaseInput } from "./shared/components";
import { ImageService, WeatherService } from "./services";
import "./styles/app.less";
import { UnitsSwitch } from "./components";

const App = () => {
  const [value, setValue] = useState("");
  const [info, setInfo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (e) => {
    const targetValue = e.target.value;

    setValue(targetValue);

    if (targetValue.length < 3) return;

    setTimeout(async () => {
      const response = await WeatherService.getCitiesAndWeatherData(
        e.target.value,
      );

      if (response.list.length > 1) {
        setIsOpen(true);
      }
      console.log(response);
    });
  };

  const onClick = async () => {
    const images = await ImageService.getPlaceImage(value);

    console.log(images);
    setInfo(images);
  };
  const items = [
    {
      key: "1",
      label: (
        <Link to="place/1">
          <div>{1}</div>
        </Link>
      ),
      // // eslint-disable-next-line react/no-unstable-nested-components
      onClick: ({ item, key, keyPath, selectedKeys, domEvent }) => {
        console.log("hello");
        setIsOpen(false);
      },
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];

  console.log(info);
  return (
    <div>
      <div className="d-f ai-c">
        <Dropdown
          open={isOpen}
          menu={{
            items,
          }}
        >
          <BaseInput
            className="w-100"
            placeholder="Enter something"
            value={value}
            onChange={onChange}
          />
        </Dropdown>
        <UnitsSwitch />
      </div>

      <Button onClick={onClick}> Call city info</Button>

      {!isEmpty(info) &&
        info.map((image) => <img src={image.imageUrl} alt={image.title} />)}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
