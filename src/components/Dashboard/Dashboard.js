import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App/Auth";
import { Tab, Segment } from "semantic-ui-react";
import { db } from "../Firebase";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState(null);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    let docs = [];
    db.collection("users")
      .doc("aRHNBBjHoC5WlghIbwYN")
      .collection("items")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          docs.push({ id: doc.id, ...doc.data() });
        });
      })
      .then(() => {
        setData(docs);
      });
  }, []);

  console.log(data);

  return (
    <div>
      <Segment style={{ height: "90vh" }}>
        <h1>Dashboard</h1>
        <h1>Welcome</h1>
        <p>This is the dashboard, if you can see this you're logged in.</p>
      </Segment>
    </div>
  );
};

export default Dashboard;
