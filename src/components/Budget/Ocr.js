import React, { Component } from "react";
import Tesseract from "tesseract.js";
import ImageUploader from "react-images-upload";
import { Button, Loader } from "semantic-ui-react";

//this needs to be an array of items that are already in the database
const data = ["BANANA", "BRUSSEL", "POTATOES"];

export class Ocr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picUrl: "",
      ocrText: [],
      isLoading: false,
      name: [],
      cost: []
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
    this.setState({ isLoading: !this.state.isLoading });
    this.textAnalysis();
  };

  textAnalysis = () => {
    var x = [];
    var y = [];
    this.state.ocrText.map(ot => (x = ot.split(/\n/)));
    for (var i = 0; i < data.length; i++) {
      y.push(x.filter(element => element.includes(data[i])));
    }
    this.splitNameFromCost(y);
  };

  splitNameFromCost = input => {
    var newArray = [];
    for (var i = 0; i < input.length; i++) {
      newArray.push(input[i].toString().split("$"));
    }
    var name = [];
    var cost = [];
    for (var i = 0; i < newArray.length; i++) {
      name.push(newArray[i][0]);
      cost.push(newArray[i][1]);
    }
    this.changeName(name);
    this.changeCost(cost);
  };

  changeName = input => {
    this.setState({ name: input });
  };

  changeCost = input => {
    this.setState({ cost: input });
  };

  saveAndContinue = e => {
    e.preventDefault();
    this.props.getChildNameOnSubmit(this.state.name);
    this.props.getChildCostOnSubmit(this.state.cost);
    this.props.nextStep();
  };

  render() {
    return (
      <div style={{ height: "100vh" }} className="centered">
        <ImageUploader
          withIcon={true}
          withPreview={true}
          buttonText="Choose Images"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
        <div>
          {this.state.ocrText.length > 0 ? (
            <div>
              <p>The result is</p>
              <p>{this.state.name}</p>
              <p>{this.state.cost}</p>
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
        <Button onClick={this.saveAndContinue}>Save And Continue</Button>
      </div>
    );
  }
}

export default Ocr;
