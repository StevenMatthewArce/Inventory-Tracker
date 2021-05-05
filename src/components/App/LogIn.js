import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import { Segment, Grid, Header, Icon, Form, Button } from "semantic-ui-react";
import { auth } from "../Firebase/index";

const LogIn = () => {
  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then(user => console.log(user));
    } catch (error) {
      alert(error);
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return (
      <>
        <Redirect to="/dashboard" />
      </>
    );
  }
  return (
    <div
      style={{
        height: "90vh",
        backgroundColor: "#f1f1f1",
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
          textAlign: "center",
          color: "#74706d"
        }}
      >
        <Grid>
          <Grid.Column width={6}>
            <div>
              <Header
                as="h1"
                style={{ marginTop: 100, padding: 0, fontSize: 50 }}
              >
                Welcome Back
              </Header>
              <Header
                as="h3"              
                style={{ margin: 0, padding: 0, fontSize: 30 }}
              >
                to inventory tracker
              </Header>
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
                Login
              </Button>
            </Form>
            <Button
              secondary
              floated="right"
              size="tiny"
              as={Link}
              to="/signup"
            >
              Sign Up
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

export default LogIn;
