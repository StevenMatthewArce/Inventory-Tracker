import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { auth as firebaseConfig } from "../Firebase/index";
import { Segment, Grid, Header, Icon, Form, Button } from "semantic-ui-react";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig.createUserWithEmailAndPassword(
        email.value,
        password.value
      );
      setCurrentUser(true);
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div
      style={{
        height: "90vh",
        backgroundColor: "#2185d0",
        margin: 0,
        padding: 0
      }}
    >
      <Segment
        padded="very"
        raised
        style={{
          top: "50%",
          marginRight: "20%",
          left: "50%",
          transform: `translate(-50%, -50%)`,
          textAlign: "center"
        }}
      >
        <Grid>
          <Grid.Column width={6}>
            <div>
              <Header
                as="h1"
                color="blue"
                style={{ margin: 0, padding: 0, fontSize: 50 }}
              >
                Welcome
              </Header>
              <Header as="h3" color="blue" style={{ margin: 0, padding: 0 }}>
                to inventory tracker
              </Header>
              <br />
              <Icon name="check circle outline" />
              <b>Inventory Tracker</b>
              <br />
              <br />
              <Icon name="check circle outline" />
              <b>Order Organizer</b>
              <br />
              <br />
              <Icon name="check circle outline" />
              <b>Budget Helper</b>
            </div>
          </Grid.Column>

          <Grid.Column width={10}>
            <Form
              onSubmit={handleSubmit}
              style={{ padding: "10%", textAlign: "left" }}
            >
              <Form.Field>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="lightningmcqueen@gmail.com"
                />
              </Form.Field>
              <Form.Field type={"password"}>
                <label>Password</label>
                <input name="password" type="password" placeholder="*****" />
              </Form.Field>
              <Button primary type="submit">
                Sign Up
              </Button>
            </Form>
            <Button secondary floated="right" size="tiny" as={Link} to="/">
              Login
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

export default SignUp;
