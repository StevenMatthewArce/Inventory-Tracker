import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App/Auth";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div style={{ height: "100vh" }}>
      <h1>Dashboard</h1>
      <h1>Welcome</h1>
      <p>This is the dashboard, if you can see this you're logged in.</p>
    </div>
  );
};

export default Dashboard;
