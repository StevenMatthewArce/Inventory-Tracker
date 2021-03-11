import React, { useState } from "react";
import Tesseract from "tesseract.js";
import ImageUploader from "react-images-upload";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "semantic-ui-react";

//this needs to be an array of items that are already in the database
const data = ["BANANA", "BRUSSEL SPROUTS", "POTATOES"];
const recognized2 = [];

function ImageLoader(props) {
  const [picUrl, setPicUrl] = useState([]);
  const [ocrText, setOcrText] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recognized, setRecognized] = useState([]);

  const onDrop = (_, pictureURL) => {
    setPicUrl(pictureURL);
  };

  const runOcr = () => {
    picUrl.forEach(picture =>
      Tesseract.recognize(picture, "eng").then(({ data: { text } }) => {
        setOcrText(oldarray => [...oldarray, text]);
      })
    );
    setIsLoading(true);
  };

  const saveAndContinue = e => {
    e.preventDefault();
    props.nextStep();
  };

  const textAnalysis = ot => {
    for (var i = 0; i < data.length; i++) {
      if (ot.includes(data[i])) {
        recognized2.push(data[i]);
        setRecognized(recognized2)
      }
    }
  };

  const sendToParent = () => {
    //here calling Parents changeValue
   props.getChildInputOnSubmit(this.state.recognized);
  };

  return (
    <div className="centered">
      <ImageUploader
        withIcon={true}
        withPreview={true}
        buttonText="Choose Images"
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      <div className="ocr-button" onClick={runOcr}>
        Run OCR
      </div>
      {ocrText.length > 0 ? (
        <ul className="ocr-list">
          {ocrText.map(ot => (
            <li className="ocr-element" key={ocrText.indexOf(ot)}>
              <strong>{ocrText.indexOf(ot) + 1}-) </strong>
              {textAnalysis(ot)}
              {console.log(recognized)}
              {ot}
            </li>
          ))}
        </ul>
      ) : (
        <ClipLoader color="#ffffff" loading={isLoading} size={150} />
      )}
      <Button onClick={saveAndContinue, sendToParent}>Save And Continue </Button>
    </div>
  );
}

export default ImageLoader;
