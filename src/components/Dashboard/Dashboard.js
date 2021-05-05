import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App/Auth";
import { Segment, Grid, Header, Divider, StepGroup } from "semantic-ui-react";
import { db } from "../Firebase";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  // const [data, setData] = useState(null);
  const [mostPopularItem, setMostPopularItem] = useState("");
  const [totalSaleMonth, setTotalSaleMonth] = useState(0);
  const [totalExpenseMonth, setTotalExpenseMonth] = useState(0);
  const [lateOrders, setLateOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    let docs = [];
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then(querySnapshot => {
        let {
          mostPopularItem,
          totalSaleMonth,
          totalExpenseMonth
        } = querySnapshot.data();
        setMostPopularItem(mostPopularItem);
        setTotalSaleMonth(totalSaleMonth);
        setTotalExpenseMonth(totalExpenseMonth);
      });
  }, [1]);

  useEffect(() => {
    let docs = [];
    db.collection("users")
      .doc(currentUser.uid)
      .collection("orders")
      .where("finished", "==", "0")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          docs.push({ id: doc.id, ...doc.data() });
        });

        var currentdate = new Date();
        var cur_month = currentdate.getMonth() + 1;
        var cur_year = currentdate.getFullYear();
        var cur_date = currentdate.getDate();

        let currentOrders = [];
        let lateOrders = [];
        docs.map(element => {
          let parts = element.dateNeededBy.split(/[/ :]/);
          // console.log(parts);
          let month = parseInt(parts[0]);
          let date = parseInt(parts[1]);
          let year = parseInt(parts[2]);

          if (cur_month <= month && cur_date <= date && cur_year <= year) {
            currentOrders.push(element);
          } else {
            lateOrders.push(element);
          }
        });

        setCurrentOrders(currentOrders);
        setLateOrders(lateOrders);
      });
  }, [1]);

  console.log(currentOrders);
  console.log(lateOrders);

  const data = [
    { x: 0, y: 8 },
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 3 },
    { x: 8, y: 2 },
    { x: 9, y: 0 }
  ];

  return (
    <div>
      <Segment style={{ height: "100vh", backgroundColor: "#f1f1f1" }}>
        <Header
          style={{ margin: 0, padding: 0, color: "#4c4c4d" }}
          content="Dashboard"
          subheader="Welcome to your Dashboard"
          as="h1"
        />
        <Divider />
        <Grid divided>
          <Grid.Column width={12}>
            <Grid>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Segment>
                    <Header
                      icon="chart line"
                      style={{
                        textAlign: "center",
                        color: "#76c80d",
                        fontSize: 40
                      }}
                      size="large"
                      content={"$" + totalSaleMonth}
                      subheader="Sales This Month"
                    />
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <Header
                      icon="cart"
                      style={{
                        textAlign: "center",
                        color: "#fe5e39",
                        fontSize: 40
                      }}
                      size="large"
                      content={"$" + totalExpenseMonth}
                      subheader="Expenses This Month"
                    />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <br style={{ height: "5vh" }} />
            <Grid.Row>
              <Grid columns={3}>
                <Grid.Column>
                  <Segment>
                    <Header
                      style={{
                        textAlign: "center",
                        color: "#74706d",
                        fontSize: 20
                      }}
                      size="large"
                      // value={this.state.mostPopularItem}
                      //FIXME: Change this
                      content="10"
                      subheader="Products Sold This Month"
                    />
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <Header
                      style={{
                        textAlign: "center",
                        color: "#74706d",
                        fontSize: 20
                      }}
                      size="large"
                      content={mostPopularItem}
                      subheader="Most Popular Item Sold"
                    />
                  </Segment>
                </Grid.Column>
                <Grid.Column>
                  <Segment>
                    <Header
                      style={{
                        textAlign: "center",
                        color: "#74706d",
                        fontSize: 20
                      }}
                      size="large"
                      // value={this.state.mostPopularItem}
                      //FIXME: Change this
                      content="20"
                      subheader="Customers This Month"
                    />
                  </Segment>
                </Grid.Column>
              </Grid>
            </Grid.Row>
            <br style={{ height: "5vh" }} />
            <Grid.Row>
              <Grid columns={3}>
                <Grid.Row>
                  <Grid.Column>
                    <Segment padded style={{ height: "40vh" }}>
                      <Header
                        style={{ textAlign: "center", color: "#74706d" }}
                        content="Product Sales"
                      />
                      <VictoryChart>
                        <VictoryAxis label="Months" />
                        <VictoryAxis
                          dependentAxis
                          // tickFormat specifies how ticks should be displayed
                          tickFormat={x => `$${x}`}
                        />
                        <VictoryLine
                          data={data}
                          //interpolation="natural"
                          labels={({ datum }) => datum.y}
                          theme={VictoryTheme.material}
                          style={{
                            data: {
                              stroke: "#02B875"
                            }
                          }}
                        />
                        {/* height={1} width={4} */}
                      </VictoryChart>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment padded style={{ height: "40vh" }}>
                      <Header
                        style={{ textAlign: "center", color: "#74706d" }}
                        content="Expenses"
                      />
                      <VictoryChart>
                        <VictoryAxis label="Months" />
                        <VictoryAxis
                          dependentAxis
                          // tickFormat specifies how ticks should be displayed
                          tickFormat={x => `$${x}`}
                        />
                        <VictoryLine
                          data={data}
                          //interpolation="natural"
                          labels={({ datum }) => datum.y}
                          theme={VictoryTheme.material}
                          style={{
                            data: {
                              stroke: "#02B875"
                            }
                          }}
                        />
                        {/* height={1} width={4} */}
                      </VictoryChart>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment padded style={{ height: "40vh" }}>
                      <Header
                        style={{ textAlign: "center", color: "#74706d" }}
                        content="Profit"
                      />
                      <VictoryChart>
                        <VictoryAxis label="Months" />
                        <VictoryAxis
                          dependentAxis
                          // tickFormat specifies how ticks should be displayed
                          tickFormat={x => `$${x}`}
                        />
                        <VictoryLine
                          data={data}
                          //interpolation="natural"
                          labels={({ datum }) => datum.y}
                          theme={VictoryTheme.material}
                          style={{
                            data: {
                              stroke: "#02B875"
                            }
                          }}
                        />
                        {/* height={1} width={4} */}
                      </VictoryChart>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={4}>
            <Grid.Row>
              <Segment style={{ minHeight: "25vh" }} padded>
                <Header
                  style={{ textAlign: "center", color: "#fe5e39" }}
                  content="LATE ORDERS"
                />
                <Divider />
                {lateOrders.map(element => {
                  return <Segment id={element.id}> {element.name} </Segment>;
                })}
              </Segment>
            </Grid.Row>
            <br style={{ height: "10vh" }} />
            <Grid.Row>
              <Segment style={{ minHeight: "40vh" }}>
                <Header
                  style={{ textAlign: "center", color: "#74706d" }}
                  content="CURRENT ORDERS"
                />
                <Divider />
                {currentOrders.map(element => {
                  return <Segment id={element.id}> {element.name} </Segment>;
                })}
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
};

export default Dashboard;
