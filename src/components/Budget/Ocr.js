import React, { Component } from "react";
import Tesseract from "tesseract.js";
import ImageUploader from "react-images-upload";
import { Button, Loader } from "semantic-ui-react";
import { projectFirestore } from "../Firebase";
import { set } from "lodash";

//this needs to be an array of items that are already in the database
const data = ["BANANA", "BRUSSEL", "POTATOES"];
const text = [
  `DATE 08/01/2016 weo
SRR
IUCHINNT GREEN $4.66
0.778kg NET @ $5.99/ka
BANANA CAVENDISH $1.32
0.442kn NET # $2.98/ka
SPECIAL $0.99
SPECIAL $1.50
POTATOES BRUSHED $3.97
] 1.328ka NET © $2.99/kg
BROCCOLT $4.84
0.808ka NET @ $5.99/ka
BRUSSEL SPROUTS $5.15
0.32kg NET @ $15.99/ka
SPECTAL $0.99
GRAPES GREEN $7.03
1.174kg NET @ $5.99/ka
PEAS SNOW $3.21
0.218ka NET @ $14.99/ka
TONATOES GRAPE $2.99
LETTUCE ICEBERG $2.49
SUBTOTAL $39.20
‘ LOYALTY -15.00
4 SUBTOTAL $24.20
SUBTOTAL $24.20
SUBTOTAL $24.20
TOTAL $24 .20
CASH $50.00
CHANGE $25.80`
];

export class Ocr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picUrl: "",
      ocrText: [],
      isLoading: false,
      name: [],
      cost: [],
      item: []
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

  debugTest = () => {
    this.setState({ ocrText: text });
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
    this.props.getChildItemOnSubmit(this.state.name, this.state.cost);
    this.props.nextStep();
  };

  render() {
    return (
      <div style={{ height: "100vh" }} className="centered">
        {console.log(this.state.data)}
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
        {console.log(this.state)}
        <Button onClick={this.runOcr}>Run OCR</Button>
        <Button onClick={this.saveAndContinue}>Save And Continue</Button>
        <Button onClick={this.debugTest}> Debug</Button>
      </div>
    );
  }
}

export default Ocr;
