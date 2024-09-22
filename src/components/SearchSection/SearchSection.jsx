import React, { useEffect, useRef, useState } from "react";
import { Col, Dropdown, Row } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { debounce, isEmpty } from "lodash";

import { BaseInput } from "../../shared/components";
import UnitsSwitch from "../UnitsSwitch";
import UserLocation from "../UserLocation";
import { cityWeatherStore } from "../../store";
import useLoading from "../../hooks/useLoading";
import styles from "./SearchSection.module.less";

const SearchSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { citiesList, getCitiesByQuery } = cityWeatherStore();
  const [getCities, isLoading] = useLoading(getCitiesByQuery);

  const debouncedSearchRequest = useRef(
    debounce(async (query) => {
      await getCities(query);
    }, 350),
  ).current;

  useEffect(
    () => () => debouncedSearchRequest.cancel(),
    [debouncedSearchRequest],
  );

  useEffect(() => {
    if (isEmpty(citiesList)) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [citiesList]);

  const onChange = (e) => {
    const { value } = e.target;

    setInputValue(value);

    if (value.length <= 3 || !value) {
      return;
    }

    debouncedSearchRequest(value);
  };

  const onClear = () => setInputValue("");

  const items = citiesList.map((city) => {
    const country = city.sys?.country;

    return {
      key: city.id,
      label: (
        <Link to={`place/${city.id}`}>
          <div className="d-f ai-c">
            <span>{city.name}</span>,<span className="m-l-5">{country}</span>
            <div className="m-l-5">
              <img
                src={`https://openweathermap.org/images/flags/${country.toLowerCase()}.png`}
                alt={country}
              />
            </div>
          </div>
        </Link>
      ),
      onClick: () => setIsOpen(false),
    };
  });

  return (
    <Row
      gutter={[15, 15]}
      align="middle"
      justify="center"
      className={styles.search}
    >
      <Col xs={22} sm={22} md={14} lg={14}>
        <Dropdown
          open={isOpen}
          menu={{
            items,
          }}
        >
          <div>
            <BaseInput
              className="w-100"
              placeholder="Search"
              value={inputValue}
              prefix={<SearchOutlined />}
              suffix={<UserLocation onClear={onClear} />}
              loading={isLoading}
              onChange={onChange}
            />
          </div>
        </Dropdown>
      </Col>
      <Col xs={22} sm={22} md={6} lg={6}>
        <UnitsSwitch />
      </Col>
    </Row>
  );
};

export default SearchSection;
