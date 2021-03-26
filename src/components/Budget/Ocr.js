import React, { Component } from "react";
import { Button, Header, Icon } from "semantic-ui-react";
import ImageUploader from "react-images-upload";
import Tesseract from "tesseract.js";

const octest = [
  "DATE 08/01/2016 weo",
  "SRR",
  "IUCHINNT GREEN $4.66",
  "0.778kg NET @ $5.99/ka",
  "BANANA CAVENDISH $1.32",
  "0.442kn NET # $2.98/ka",
  "SPECIAL $0.99",
  "SPECIAL $1.50",
  "POTATOES BRUSHED $3.97",
  "] 1.328ka NET © $2.99/kg",
  "BROCCOLT $4.84",
  "0.808ka NET @ $5.99/ka",
  "BRUSSEL SPROUTS $5.15",
  "0.32kg NET @ $15.99/ka",
  "SPECTAL $0.99",
  "GRAPES GREEN $7.03",
  "1.174kg NET @ $5.99/ka",
  "PEAS SNOW $3.21",
  "0.218ka NET @ $14.99/ka",
  "TONATOES GRAPE $2.99",
  "LETTUCE ICEBERG $2.49",
  "SUBTOTAL $39.20",
  "‘ LOYALTY -15.00",
  "4 SUBTOTAL $24.20",
  "SUBTOTAL $24.20",
  "SUBTOTAL $24.20",
  "TOTAL $24 .20",
  "CASH $50.00",
  "CHANGE $25.80",
  ""
];

export class Ocr extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: [],
      cost: [],
      quantity: [],
      dateRestocked: [],
      items: [],
      uploadedImageUrl: "",
      ocrText: [],
      status: "0"
    };
    this.onDrop = this.onDrop.bind(this);
    this.runOcr = this.runOcr.bind(this);
  }

  updateItems = () => {
    let item = [];
    for (var i = 0; i < this.state.name.length; i++) {
      item[i] = {
        name: this.state.name[i],
        cost: this.state.cost[i],
        quantity: this.state.quantity[i],
        dateRestocked: this.state.dateRestocked[0]
      };
    }

    this.setState({
      items: item
    });
  };

  updateName = input => {
    this.setState({ name: input });
  };

  updateCost = input => {
    this.setState({ cost: input });
  };

  updateQuantity = input => {
    this.setState({ quantity: input });
  };

  updateDateRestocked = input => {
    let inputString = input.toString();
    let extractedDate = inputString.match(
      /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g
    );
    this.setState({ dateRestocked: extractedDate });
  };

  saveAndContinue = e => {
    e.preventDefault();

    this.props.getChildItemOnSubmit(this.state.items);
    this.props.nextStep();
  };

  onDrop = (pictureFiles, pictureDataURLs) => {
    this.setState({
      uploadedImageUrl: pictureDataURLs
    });
    console.log(this.state.uploadedImageUrl);
    console.log(pictureDataURLs);
  };

  runOcr = () => {
    console.log("runOcr");
    this.state.uploadedImageUrl.forEach(image =>
      Tesseract.recognize(image, "eng")
        .then(({ data: { text } }) => {
          this.setState({ ocrText: text.split(/\n/), status: "1" });
          console.log("OCR Finished");
        })
        .then(() => {
          this.analyzeText();
          console.log("Analyze Text Finished");
          this.setState({ status: "2" });
        })
        .then(() => {
          this.updateItems();
          this.setState({ status: "3" });
          console.log("Update Items Finished");
          console.log(this.state);
        })
    );
  };

  analyzeText = () => {
    const text = this.state.ocrText;
    //Compare needs to be changed to a dictionary of vegtables/fruits
    const compare = ["BANANA", "BRUSSEL", "POTATOES"];
    var filteredText = [];
    var receiptDate = [];
    for (var i = 0; i < compare.length; i++) {
      filteredText.push(text.filter(word => word.includes(compare[i])));
      receiptDate = text.filter(word => word.includes("DATE"));
    }

    var splitArray = [];
    for (var i = 0; i < filteredText.length; i++) {
      splitArray.push(filteredText[i].toString().split("$"));
    }

    var name = [];
    var cost = [];
    var quantity = [];
    for (var i = 0; i < splitArray.length; i++) {
      name.push(splitArray[i][0]);
      cost.push(splitArray[i][1]);
      quantity.push("0");
    }
    this.updateName(name);
    this.updateCost(cost);
    this.updateQuantity(quantity);
    this.updateDateRestocked(receiptDate);
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <div>
          <Header as="h1" textAlign="center">
            Upload Receipt
          </Header>
        </div>
        <div>
          <ImageUploader
            withIcon={true}
            buttonClassName=""
            buttonText="Upload Receipt"
            onChange={this.onDrop}
            withPreview={true}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />
        </div>
        <div>
          <Button.Group>
            <Button icon labelPosition="left" primary onClick={this.runOcr}>
              Run OCR <Icon name="eye" />
            </Button>
            <Button
              primary
              icon
              labelPosition="right"
              onClick={this.saveAndContinue}
            >
              Save and Continue
              <Icon name="right arrow" />
            </Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

export default Ocr;
