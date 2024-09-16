import React, { useState } from "react";
import { Col, Dropdown, Row } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

import { BaseInput } from "../../shared/components";
import { WeatherService } from "../../services";
import UnitsSwitch from "../UnitsSwitch";
import UserLocation from "../UserLocation";
import styles from "./SearchSection.module.less";

const SearchSection = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onChange = async (e) => {
    const targetValue = e.target.value;

    setInputValue(targetValue);

    if (targetValue.length < 3) {
      if (isOpen) {
        setIsOpen(false);
      }
      return;
    }

    const response = await WeatherService.getCitiesAndWeatherData(
      e.target.value,
    );

    if (response.list.length > 1) {
      setIsOpen(true);
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to="place/1">
          <div>{1}</div>
        </Link>
      ),
      onClick: () => {
        setIsOpen(false);
      },
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];

  return (
    <Row
      gutter={[12, 12]}
      align="middle"
      justify="center"
      className={styles.search}
    >
      <Col xs={22} sm={22} md={14} lg={14}>
        <Dropdown
          open={isOpen}
          placement="bottomLeft"
          menu={{
            items,
          }}
        >
          <BaseInput
            className="w-100"
            placeholder="Search"
            value={inputValue}
            prefix={<SearchOutlined />}
            suffix={<UserLocation />}
            onChange={onChange}
          />
        </Dropdown>
      </Col>
      <Col xs={22} sm={22} md={6} lg={6}>
        <UnitsSwitch />
      </Col>
    </Row>
  );
};

export default SearchSection;
