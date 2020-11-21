import React from "react";
import classes from "./galleryControl.module.css";

const GalleryControl = ({ refreshPage, page, pageChange, totalPages }) => {
  const fileSpin = window.FileSpin;
  const uploadKey = process.env.REACT_APP_FILESPIN_UPLOAD_KEY;
  const handleUpload = (e) => {
    e.preventDefault();
    fileSpin.initPicker(
      {
        uploadKey,
        lang: "en",
        maxFilesize: 5,
        minFilesize: 0.01,
        maxFiles: 1,
        allowedTypes: ["jpg", "png", "gif"],
        display: true,
      },
      function () {
        fileSpin.showPicker();
      }
    );
  };

  return (
    <div className={classes.root_container}>
      <button onClick={handleUpload}>Upload Image</button>
      <button onClick={refreshPage}>Refresh Page</button>
      <span>
        <button onClick={() => pageChange(false, true)} disabled={page === 1}>
          {"<<"}
        </button>
        <button onClick={() => pageChange(false)} disabled={page === 1}>
          {"<"}
        </button>
        <span className={classes.page_number}>{page}</span>
        <button onClick={() => pageChange(true)} disabled={totalPages <= page}>
          {">"}
        </button>
        <button
          onClick={() => pageChange(true, true)}
          disabled={totalPages <= page}
        >
          {">>"}
        </button>
      </span>
    </div>
  );
};

export default GalleryControl;
