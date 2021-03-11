import React, { Component } from "react";
import Tesseract from "tesseract.js";
import ImageUploader from "react-images-upload";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "semantic-ui-react";

const data = ["BANANA", "BRUSSEL SPROUTS", "POTATOES"];

export class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picUrl: "",
      ocrText: [],
      isLoading: false,
      recognized: []
    };
  }

  onDrop = (_, pictureUrl) => {
    this.setState({ picUrl: pictureUrl });
  };

  runOcr = () => {
    this.state.picUrl.forEach(picture =>
      Tesseract.recognize(picture, "eng").then(({ data: { text } }) => {
        this.setState({ ocrText: [text] });
      })
    );

    console.log("WE HERE");
    var x = [];
    this.state.ocrText.map(ot => (x = ot.replace(/\n/g, " ").split(" ")));
    console.log(x);

    var recognized2 = [];
    for (var i = 0; i < data.length; i++) {
      console.log("we made it");
      if (x.includes(data[i])) {
        recognized2.push(data[i]);
      }
    }
    console.log(recognized2);
    this.setState({ recognized: [recognized2] });
  };

  saveAndContinue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    return (
      <div className="centered">
        <ImageUploader
          withIcon={true}
          withPreview={true}
          buttonText="Choose Images"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
        <button onClick={this.runOcr}>Run OCR</button>

        {/* <Button onClick={(saveAndContinue)}>
          Save And Continue{" "}
        </Button> */}
        {console.log("GFDJHSGDJKFHSDKJ")}
        {console.log(this.state.recognized)}
      </div>
    );
  }
}

export default Test;
