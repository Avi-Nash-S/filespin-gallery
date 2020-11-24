import React, { useState, useEffect } from "react";
import axios from "axios";
import GalleryView from "../components/galleryView/galleryView";
import GalleryControl from "../components/galleryControl/galleryControl";
import PreviewImage from "../components/previewImage/previewImage";

const LandingPage = () => {
  const [images, setImages] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const getImages = () => {
    setLoading(true);
    axios
      .post(
        "https://app.filespin.io/api/v1/search",
        {
          headers: {
            "X-FileSpin-Api-Key": process.env.REACT_APP_FILESPIN_API_KEY,
          },
        }
      )
      .then((res) => {
        setImages(res.data.result);
        setSearchId(res.data.search_result_id);
        setTotalPages(res.data.total_pages);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };
  const getPaginatedImages = () => {
    setLoading(true);
    axios
      .get(`https://app.filespin.io/api/v1/search/${searchId}/${page}`, {
        headers: {
          "X-FileSpin-Api-Key": process.env.REACT_APP_FILESPIN_API_KEY,
        },
      })
      .then((res) => {
        setLoading(false);
        setImages(res.data.result);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    page === 1 ? getImages() : getPaginatedImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getImageById = (e) => {
    setDisplayImage(e.target.src);
  };
  const pageChange = (next, end) => {
    next
      ? end
        ? setPage(totalPages)
        : setPage(page >= totalPages ? totalPages : page + 1)
      : end
      ? setPage(1)
      : setPage(page <= 1 ? 1 : page - 1);
  };
  const refreshPage = () => getPaginatedImages();

  return (
    <React.Fragment>
      {displayImage === null ? (
        <div>
          <GalleryControl
            refreshPage={refreshPage}
            page={page}
            totalPages={totalPages}
            pageChange={pageChange}
          />
          {!error ? (
            !loading ? (
              <GalleryView images={images} getImageById={getImageById} />
            ) : (
              <div style={{ textAlign: "center" }}>
                <p>Loading...</p>
              </div>
            )
          ) : (
            <p style={{ textAlign: "center" }}>Something Went Wrong</p>
          )}
        </div>
      ) : (
        <PreviewImage
          displayImage={displayImage}
          onClose={() => setDisplayImage(null)}
        />
      )}
    </React.Fragment>
  );
};

export default LandingPage;
