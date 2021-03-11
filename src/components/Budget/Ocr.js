import React, { Component } from "react";
import Tesseract from "tesseract.js";
import ImageUploader from "react-images-upload";
<<<<<<< HEAD
import { Button, Loader } from "semantic-ui-react";
=======
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "semantic-ui-react";
>>>>>>> input-receipt

//this needs to be an array of items that are already in the database
const data = ["BANANA", "BRUSSEL SPROUTS", "POTATOES"];

export class Ocr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picUrl: "",
      ocrText: [],
      isLoading: false,
      name: []
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
    var x = [];
    this.state.ocrText.map(ot => (x = ot.replace(/\n/g, " ").split(" ")));
    console.log(x);
    for (var i = 0; i < data.length; i++) {
      if (x.includes(data[i])) {
        this.state.name.push(data[i]);
      }
    }
<<<<<<< HEAD

=======
>>>>>>> input-receipt
    this.setState({ isLoading: !this.state.isLoading });
  };

  saveAndContinue = e => {
    e.preventDefault();
    this.props.getChildInputOnSubmit(this.state.name);
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
<<<<<<< HEAD
        <div>
          {this.state.ocrText.length > 0 ? (
            <div>
              <p>The result is</p>
              <p>{this.state.name}</p>
            </div>
          ) : (
            <div>
              <Loader
                size="massive"
                active={this.state.isLoading}
                inline="centered"
              >
                Loading
              </Loader>
            </div>
          )}
        </div>
        <Button onClick={this.runOcr}>Run OCR</Button>
=======
        <Button onClick={this.runOcr}>Run OCR</Button>
        {this.state.ocrText.length > 0 ? (
          <div>
            <p>The result is</p>
            <p>{this.state.name}</p>
          </div>
        ) : (
          <ClipLoader
            color="#000000"
            loading={this.state.isLoading}
            size={150}
          />
        )}
>>>>>>> input-receipt
        <Button onClick={this.saveAndContinue}>Save And Continue</Button>
        {console.log("End")}
        {console.log(this.state.name)}
      </div>
    );
  }
}

export default Ocr;
