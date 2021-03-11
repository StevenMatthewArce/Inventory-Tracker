import React, { Component } from "react";
import Tesseract from "tesseract.js";
import ImageUploader from "react-images-upload";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "semantic-ui-react";

const data = ["BANANA", "BRUSSEL SPROUTS", "POTATOES"];
var recognized2 = [];

export class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picUrl: "",
      ocrText: [],
      isLoading: false,
      recognized: ["HI"]
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

    // console.log("WE HERE");
    var x = [];
    this.state.ocrText.map(ot => (x = ot.replace(/\n/g, " ").split(" ")));
    // console.log(x);

    for (var i = 0; i < data.length; i++) {
      // console.log("we made it");
      if (x.includes(data[i])) {
        this.state.recognized.push(data[i]);
      }
    }
    // console.log(this.state.recognized);
    // console.log("dsfhjksdhfjksdjkfhksdhffkjsdhfkjsdhfkj");
    this.setState({ isLoading: !this.state.isLoading });
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
        {this.state.ocrText.length > 0 ? (
          <div>
            <p>The result is</p>
            <p>{this.state.recognized}</p>
          </div>
        ) : (
          <ClipLoader
            color="#000000"
            loading={this.state.isLoading}
            size={150}
          />
        )}
        {/* <Button onClick={(saveAndContinue)}>
          Save And Continue{" "}
        </Button> */}
        {console.log("End")}
        {console.log(this.state.recognized)}
      </div>
    );
  }
}

export default Test;
