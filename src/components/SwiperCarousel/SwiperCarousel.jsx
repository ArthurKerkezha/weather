import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";

import BannerSection from "../BannerSection";

const SwiperCarousel = ({ children, images }) => (
  <Swiper
    parallax
    navigation
    effect="fade"
    autoplay={{ delay: 5000, disableOnInteraction: false }}
    modules={[Autoplay, EffectFade]}
  >
    {children}
    <>
      {images.map((image) => (
        <SwiperSlide>
          <BannerSection backgroundImage={image} />
        </SwiperSlide>
      ))}
    </>
  </Swiper>
);

SwiperCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.node,
};
SwiperCarousel.defaultProps = {
  children: null,
};

export default SwiperCarousel;
