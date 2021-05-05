import React, { Component } from "react";
import {
  Button,
  Header,
  Icon,
  Message,
  Divider,
  Grid,
  Form,
  Segment
} from "semantic-ui-react";
import ImageUploader from "react-images-upload";
import Tesseract from "tesseract.js";
import { Link } from "react-router-dom";
import "./style.css";
import  fruitVegs from "./WordList.json"



//TODO: Add OCR Recognition for Store Name
//TODO: Add OCR Recognition for Total
//TODO: Add Button to change date
//!: Remove Debug Button

export class Ocr extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: [],
      name: [],
      cost: [],
      quantity: [],
      dateRestocked: [],
      items: [],
      imageAsFile: "",
      uploadedImageUrl: "",
      ocrText: [],
      status: null,
      imageUploadedStatus: "0",
      updatedStatus: null,
      errorMessage: null,
      store: "",
      totalCost: "",
      description: ""
    };
    this.onDrop = this.onDrop.bind(this);
    this.runOcr = this.runOcr.bind(this);
    this.debug = this.debug.bind(this);
  }

  updateItems = () => {
    let item = [];
    for (var i = 0; i < this.state.name.length; i++) {
      item[i] = {
        id: i,
        name: this.state.name[i],
        cost: this.state.cost[i],
        quantity: this.state.quantity[i],
        dateRestocked: this.state.dateRestocked[0]
      };
    }

    this.setState(
      {
        items: item
      },
      console.log(this.state)
    );
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

  saveAndContinue = async e => {
    e.preventDefault();
    const { imageAsFile } = this.state;

    if (this.state.store === "" || this.state.totalCost === "") {
      this.setState({ errorMessage: "Please add a Store and Total Cost" });
    } else {
      // let imageAsUrl = "";
      // if (imageAsFile) {
      //   imageAsUrl = await this.getImgFirebaseUrl();
      // }
      this.props.getChildOnSubmit(
        this.state.imageAsFile,
        this.state.items,
        this.state.store,
        this.state.totalCost,
        this.state.description
      );
      this.props.nextStep();
    }
  };

  // getImgFirebaseUrl = async () => {
  //   console.log("start of upload");
  //   const {imageAsFile} = this.state

  //   const uploadTask = storage
  //     .ref(`/images/${imageAsFile.name}`)
  //     .put(imageAsFile);

  //   //initiates the firebase side uploading

  //   return new Promise((resolve, reject) => {
  //     uploadTask.on(
  //       "state_changed",
  //       snapShot => {
  //         console.log(snapShot);
  //       },
  //       err => {
  //         reject(err);
  //         console.log(err);
  //       },
  //       () => {
  //         storage
  //           .ref("images")
  //           .child(imageAsFile.name)
  //           .getDownloadURL()
  //           .then(fireBaseUrl => {
  //             this.setState({imgUrl: fireBaseUrl})
  //             resolve(fireBaseUrl);
  //           });
  //       }
  //     );
  //   });
  // };

  onDrop = (pictureFiles, pictureDataURLs) => {
    if (pictureFiles.length === 1) {
      this.setState(
        {
          imageUploadedStatus: "1",
          errorMessage: null,
          uploadedImageUrl: pictureDataURLs,
          imageAsFile: pictureFiles[0]
        },
        console.log(this.state.imageAsFile)
      );
    } else {
      this.setState({ imageUploaded: "0" });
    }
    console.log("Image Uploaded");
  };

  runOcr = () => {
    console.log("runOcr");
    if (this.state.imageUploadedStatus === "1") {
      this.setState({ status: "0" });
      this.state.uploadedImageUrl.forEach(image =>
        Tesseract.recognize(image, "eng")
          .then(({ data: { text } }) => {
            this.setState({ ocrText: text.split(/\n/), status: "1" });
            console.log(this.state.ocrText)
            console.log("OCR Finished");
          })
          .then(() => {
            this.analyzeText();
            console.log("Analyze Text Finished");
            this.setState({ status: "2" });
          })
          .then(() => {
            this.updateItems();
            this.setState({ status: null, updatedStatus: "1" });
            console.log("Update Items Finished");
          })
      );
    } else {
      this.setState({ errorMessage: "Please upload image!" });
    }
  };

  analyzeText = () => {
    const text = this.state.ocrText;
    //TODO: Change compare to dictionary so it matches more words
    const compare = fruitVegs;
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
      quantity.push("1");
    }
    this.updateName(name);
    this.updateCost(cost);
    this.updateQuantity(quantity);
    this.updateDateRestocked(receiptDate);
    console.log("Analyze Text");
  };

  handleChange = (e, { name, value }) => {
    e.preventDefault();
    this.setState({ [name]: value }, console.log(this.state));
  };

  //! Remove After
  debug = () => {
    this.setState(
      {
        name: ["BANANA", "BRUSSEL", "POTATOES"],
        cost: ["2.00", "3.00", "4.00"],
        quantity: ["1", "1", "1"],
        dateRestocked: ["02/20/2021"],
        updatedStatus: "1",
        store: "Albertsons",
        totalCost: "120",
        description: "This is some comment about the receipt"
      },
      this.updateItems
    );
  };

  render() {
   
    return (
      <Segment style={{ height: "90vh", backgroundColor: "#f1f1f1" }}>
        <div>
          <Button labelPosition="left" icon style={{backgroundColor:"#666364", color:"#ffffff"}} as={Link} to="/budget">
            Back
            <Icon name="left arrow"></Icon>
          </Button>
        </div>
        <br></br>
        <div>
          <Grid>
            <Grid.Column width={9}>
              <Grid.Row>
                <Header as="h1" style={{color:"#36393e"}} content="Receipt Upload" subheader= "Please upload your receipt or click next to manually add items"textAlign="left"/>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={7} textAlign="right">
              {this.state.status != null ? (
                <Button icon loading labelPosition="left" style={{backgroundColor:"#3db39c", color:"white"}}>
                  Run OCR <Icon name="eye" />
                </Button>
              ) : (
                <Button icon labelPosition="left"  style={{backgroundColor:"#3db39c", color:"white"}} onClick={this.runOcr}>
                  Run OCR <Icon name="eye" />
                </Button>
              )}
              <Button
                style={{backgroundColor:"#77c90e", color:"#ffffff"}}
                icon
                labelPosition="right"
                onClick={this.saveAndContinue}
              >
                Next
                <Icon name="right arrow" />
              </Button>
            </Grid.Column>
          </Grid>
        </div>
        <Divider />
        <Grid centered>
          <Grid.Column width={10}>
            <ImageUploader
              withIcon={true}
              buttonClassName="chooseFileButton"
              buttonText="Upload Receipt"
              onChange={this.onDrop}
              withPreview={true}
              singleImage={true}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
          </Grid.Column>

          <Form>
            <Form.Group>
              <Form.Input
                required
                icon="address card"
                iconPosition="left"
                label="Store:"
                name="store"
                value={this.state.store}
                onChange={this.handleChange}
              />
              <Form.Input
                required
                icon="dollar sign"
                iconPosition="left"
                label="Total:"
                name="totalCost"
                value={this.state.totalCost}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.TextArea
              width={20}
              name="description"
              style={{ minHeight: 100 }}
              label="Description:"
              placeholder="This is some comment about the receipt"
              onChange={this.handleChange}
            />
          </Form>
        </Grid>

        {this.state.errorMessage && (
          <Message negative>{this.state.errorMessage}</Message>
        )}
        <div>
          {/* <Button icon labelPosition="left" secondary onClick={this.debug}>
            Debug <Icon name="eye" />
          </Button> */}
        </div>
      </Segment>
    );
  }
}

export default Ocr;
