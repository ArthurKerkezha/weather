import React from "react";
import PropTypes from "prop-types";
import { cx, css } from "@emotion/css";

import weatherImage from "../../media/weather.jpeg";
import styles from "./BannerSection.module.less";

const BannerSection = ({ backgroundImage }) => (
  <div
    className={cx(
      styles.banner,
      css`
        background-image: url(${backgroundImage || weatherImage});
      `,
    )}
  />
);

BannerSection.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
};

export default BannerSection;
