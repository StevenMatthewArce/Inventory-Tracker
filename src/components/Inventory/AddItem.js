import React, { useState, useContext } from "react";
import { db, storage } from "../Firebase";
import { AuthContext } from "../App/Auth";
import { DateInput } from "semantic-ui-calendar-react";
import {
  Form,
  Button,
  Message,
  Icon,
  Header,
  Divider,
  Grid,
  TextArea,
  Segment
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";

const AddItem = props => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [cost, setCost] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [dateRestocked, setDate] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const uid = currentUser.uid;

  let history = useHistory();

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleDescChange = e => {
    setDescription(e.target.value);
  };

  const handleCostChange = e => {
    setCost(e.target.value);
  };

  const handleQuantityChange = e => {
    setQuantity(e.target.value);
  };

  const handleDateChange = (name, value) => {
    setDate(value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(imageAsFile);
    let imageAsUrl = "";
    if (imageAsFile) {
      imageAsUrl = await getImgFirebaseUrl();
    }

    db.collection("users")
      .doc(uid)
      .collection("items")
      .add({
        name,
        description,
        cost,
        quantity,
        dateRestocked,
        imageAsUrl
      })
      .then(() => {
        setMessage("Item has been submitted. ");
        handleRedirect();
      })
      .catch(err => {
        setError(err);
      });
  }

  const handleRedirect = () => {
    setTimeout(() => {
      history.push("/inventory");
    }, 3000);
  };

  const handleImageAsFile = e => {
    const image = e.target.files[0];
    setImageAsFile(imageFile => image);
    console.log(image);
  };

  const getImgFirebaseUrl = async () => {
    console.log("start of upload");

    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);

    //initiates the firebase side uploading

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        snapShot => {
          console.log(snapShot);
        },
        err => {
          reject(err);
          console.log(err);
        },
        () => {
          storage
            .ref("images")
            .child(imageAsFile.name)
            .getDownloadURL()
            .then(fireBaseUrl => {
              setImageAsUrl(prevObject => ({
                ...prevObject,
                imgUrl: fireBaseUrl
              }));
              resolve(fireBaseUrl);
            });
        }
      );
    });
  };

  const isInvalid =
    name === "" || dateRestocked === null || quantity === 0 || cost === 0;

  const fileInputRef = React.createRef();

  return (
    <Segment style={{ height: "90vh",  backgroundColor: "#f1f1f1" }}>
      <div>
        <Button labelPosition="left" icon  style={{backgroundColor:"#666364", color:"#ffffff"}} as={Link} to="/inventory">
          Back
          <Icon name="left arrow"></Icon>
        </Button>
      </div>
      <br></br>
      <div>
        <Grid>
          <Grid.Column width={9}>
            <Grid.Row>
              <Header as="h1" style={{color:"#36393e"}} textAlign="left">
                Add an Item
              </Header>
              <Grid.Row>Please add your new item.</Grid.Row>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={7} textAlign="right">
            <Button
              style={{backgroundColor:"#77c90e", color:"#ffffff"}}
              disabled={isInvalid}
              type="submit"
              onClick={handleSubmit}
              labelPosition="right"
              icon
            >
              Submit
              <Icon name="send" />
            </Button>
          </Grid.Column>
        </Grid>
      </div>
      <Divider />
      <div>
        {error && (
          <Message icon="frown" negative>
            {error}
          </Message>
        )}
        {message && (
          <Message icon="smile" positive>
            {message}
          </Message>
        )}
        <Form>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                icon="tag"
                iconPosition="left"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleNameChange}
                label="Name"
                required
              />
              <Form.Input
                icon="dollar sign"
                iconPosition="left"
                placeholder="Unit Cost"
                name="cost"
                value={cost}
                onChange={handleCostChange}
                label="Cost"
                required
              />
              <Form.Input
                icon="shopping cart"
                iconPosition="left"
                placeholder="Quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                label="Quantity"
                required
              />
              <DateInput
                required
                dateFormat={"MM/DD/YYYY"}
                label="Date Restocked"
                name="dateRestocked"
                value={dateRestocked}
                iconPosition="left"
                onChange={(e, { name, value }) => handleDateChange(name, value)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                placeholder="Enter additional information"
                name="description"
                value={description}
                onChange={handleDescChange}
                label="Description"
                control={TextArea}
              />
            </Form.Group>
            <Form.Field>
              <Button
               style={{backgroundColor:"#3db39c", color:"white"}}
                content="Upload Image"
                labelPosition="left"
                icon="cloud upload"
                onClick={() => fileInputRef.current.click()}
              />
              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={handleImageAsFile}
              />
            </Form.Field>
          </Form>
        </Form>
      </div>
    </Segment>
  );
};

export default AddItem;
