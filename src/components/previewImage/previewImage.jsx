import React from "react";
import classes from "./previewImage.module.css";

const PreviewImage = ({ onClose, displayImage }) => {
  return (
    <React.Fragment>
      <span className={classes.close_container} onClick={() => onClose()}>
        x
      </span>
      <img
        alt={displayImage}
        height="100%"
        width="100%"
        style={{ objectFit: "scale-down" }}
        src={displayImage.split("?")[0]}
      />
    </React.Fragment>
  );
};

export default PreviewImage;
