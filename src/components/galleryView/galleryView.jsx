import React from "react";
import GalleryList from "../galleryList/galleryList";
import classes from "./galleryView.module.css";

const GalleryView = ({ images, getImageById }) => {
  return (
    <div className={classes.root_container}>
      {images.map((imageId) => (
        <React.Fragment key={imageId}>
          <GalleryList imageId={imageId} getImageById={getImageById} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default GalleryView;
