import React from "react";
import classes from "./galleryList.module.css";

const GalleryList = ({ imageId, getImageById }) => (
  <div className={classes.root_container}>
    <img
      alt={imageId}
      height="100%"
      width="100%"
      style={{ objectFit: "contain" }}
      src={`https://cdn.filespin.io/api/v1/conversion/${imageId}?resize=500,600`}
      onClick={getImageById}
    />
  </div>
);

export default GalleryList;
