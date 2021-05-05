import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { auth } from "../Firebase/index";
import { Segment, Grid, Header, Icon, Form, Button, Divider } from "semantic-ui-react";
import { db } from "../Firebase";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    let userDetail;
    try {
      auth
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(user => {
          const displayName = user.user.email.split("@")[0];

          user.user.updateProfile({displayName: displayName})

          const { email, uid } = user.user;
          userDetail = {
            email: email,
            uid: uid,
            displayName: displayName,
            alertValue: 5,
            mostPopularItem: "No Items Sold",
            totalSaleMonth: 0,
            totalExpenseMonth:0
          };
          db.collection("users")
            .doc(uid)
            .set(userDetail)
            .then(() => console.log("created userprofile"));
        });
      setCurrentUser(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f1f1f1",
        margin: 0,
        padding: 0,
        color:"#36393e"
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
        <Grid verticalAlign='middle'>
          <Grid.Column width={6}>
            <div>
              <Header
                as="h1"
                style={{ margin: 0, padding: 0, fontSize: 50 }}
                content= "Welcome to GYST"
                />
              <Divider/>
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
              <Button style={{backgroundColor:"#3db39c", color:"white"}} type="submit">
                Sign Up
              </Button>
            </Form>
            <Button style={{backgroundColor:"#666364", color:"#ffffff"}} floated="right" size="tiny" as={Link} to="/">
              Login
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

export default SignUp;
