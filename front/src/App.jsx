import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import PhotoGallery from "./components/photo-gallery";
import PhotoUpload from "./components/photo-upload";
import PhotoSearch from "./components/photo-search";
import PhotoInfo from "./components/photo-info";
import Header from "./components/header";
import Loading from "./components/loading";
import "./app.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [visibleImages, setVisibleImages] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [pastedFiles, setPastedFiles] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const images = await fetch("/api/images").then((res) => res.json());
      setImages(images);
      setVisibleImages(images);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    search();
  }, [searchString]);

  const search = () => {
    if (searchString) {
      setLoading(true);
      const query = searchString
        .toLowerCase()
        .split(" ")
        .filter((tag) => tag !== "")
        .map((x, i) => (i === 0 ? `?tags=${x}` : `&tags=${x}`))
        .join("");
      fetch(`/api/images${query}`)
        .then((res) => res.json())
        .then((data) => {
          setVisibleImages(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setVisibleImages(images);
    }
  };

  return (
    <div
      className="App"
      onPaste={({ clipboardData }) => {
        if (clipboardData.files.length > 0) {
          setPastedFiles(clipboardData.files);
        }
      }}
    >
      <div className="sticky">
        <Header />
        <div className="inputs">
          <PhotoUpload
            updateImages={(image) => {
              const newImages = images.concat(image);
              setImages(newImages);
              setVisibleImages(newImages);
            }}
            pasted={pastedFiles}
          />
          <PhotoSearch
            setSearchString={setSearchString}
            searchString={searchString}
            search={search}
          />
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div>
            <Switch>
              <Route exact path="/">
                <PhotoGallery images={visibleImages} />
              </Route>
              <Route path="/image/:id">
                <PhotoInfo
                  images={images}
                  search={search}
                  setSearchString={setSearchString}
                />
              </Route>
              <Route path="/">
                <div>You are lost.</div>
                <div>
                  <button onClick={() => history.push("/")}>Go back</button>
                </div>
              </Route>
            </Switch>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
