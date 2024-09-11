import React from "react";
import { useParams } from "react-router-dom";

const Place = () => {
  const { placeId } = useParams();

  console.log("hello places");
  console.log(placeId);
  return <div style={{ position: "absolute", top: "50%" }}>Place</div>;
};

export default Place;
