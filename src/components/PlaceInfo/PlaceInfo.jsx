import React from "react";
import { useParams } from "react-router-dom";

import ContentSection from "../ContentSection";

const PlaceInfo = () => {
  const { placeId } = useParams();

  console.log("hello places");
  console.log(placeId);
  return <ContentSection />;
};

export default PlaceInfo;
