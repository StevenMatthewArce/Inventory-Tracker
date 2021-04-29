import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App/Auth";
import { auth as firebaseConfig } from "../Firebase/index";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <h1>Welcome</h1>
      <p>This is the dashboard, if you can see this you're logged in.</p>
      <button onClick={() => firebaseConfig.signOut()}>Sign out</button>
    </div>
  );
};

export default Dashboard;
