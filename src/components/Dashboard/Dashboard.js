import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App/Auth";
import { Tab, Segment } from "semantic-ui-react";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Segment style={{ height: "100vh" }}>
      <h1>Dashboard</h1>
      <h1>Welcome</h1>
      <p>This is the dashboard, if you can see this you're logged in.</p>
    </Segment>
  );
};

export default Dashboard;
