import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App/Auth";
import { Segment, Grid, Header, Divider, StepGroup } from "semantic-ui-react";
import { db } from "../Firebase";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryArea, VictoryLabel } from "victory";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  // const [data, setData] = useState(null);
  const [mostPopularItem, setMostPopularItem] = useState("");
  const [totalSaleMonth, setTotalSaleMonth] = useState(0);
  const [totalExpenseMonth, setTotalExpenseMonth] = useState(0);
  const [lateOrders, setLateOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [sales, setSales] = useState([])
  const [itemsSold, setItemsSold] = useState(0)
  const [customers, setCustomers] = useState(0)
  const [salesData, setSalesData] = useState([])
  const [expenses, setExpenses] = useState([])
  const [expenseData, setExpenseData] = useState([])
  const [profitData, setProfitData] = useState([])

  if (!currentUser) {
    return <Redirect to="/" />;
  }

  console.log(currentUser)

  const currentdate = new Date();
  const cur_month = currentdate.getMonth() + 1;
  const cur_year = currentdate.getFullYear();
  const cur_date = currentdate.getDate();

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

  useEffect(()=>{
    let docs = [];
    let month = cur_month.toString()
    if((month-10)<0){
      month = "0"+month
  }
    db.collection("users")
      .doc(currentUser.uid)
      .collection("sales")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          docs.push({ id: doc.id, ...doc.data() });
        })
        setSales(docs)

        let itemsSold = 0;
        docs.map(element=>{
          element[0].items.map(element=>itemsSold += parseInt(element.quantity))
      })

      setItemsSold(itemsSold)
      setCustomers(docs.length)

      })
  },[1])


useEffect(()=>{

  let monthArr = new Array(12).fill(0);
  for (let k = 0; k < monthArr.length; k++) {
      let totalSalesMonth = 0;
      var currentdate = new Date();
      var cur_month = k + 1;
      var cur_year = currentdate.getFullYear();
  
      sales.map(element => {
          let parts = element.currentdate.split(/[/ :]/);
          let month = parts[0];
          let year = parts[2];
          if (cur_month == month && year == cur_year) {
            totalSalesMonth += parseFloat(element[0].orderCost)
          }
        });
   
    monthArr[k] = totalSalesMonth;
  }
    
  
  var graphData = [];
  for (let k in monthArr) {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    //let m = +k+ +1;
    graphData.push({ x: months[k], y: monthArr[k] });
  }

  setSalesData(graphData)

},[sales])


useEffect(()=>{
  let docs = [];
  let month = cur_month.toString()
  if((month-10)<0){
    month = "0"+month
}
  db.collection("users")
    .doc(currentUser.uid)
    .collection("receipts")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() });
      })
      setExpenses(docs)
    })


},[1])


useEffect(()=>{
  let monthArr = new Array(12).fill(0);
  for (let k = 0; k < monthArr.length; k++) {
      let totalExpenseMonth = 0;
      var currentdate = new Date();
      var cur_month = k + 1;
      var cur_year = currentdate.getFullYear();
  
      expenses.map(element => {
          let parts = element.date.split(/[/ :]/);
          let month = parts[0];
          let year = parts[2];
          if (cur_month == month && year == cur_year) {
            totalExpenseMonth += parseFloat(element.totalCost)
          }
        });
   
    monthArr[k] = totalExpenseMonth;
  }
  
  var graphData = [];
  for (let k in monthArr) {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    //let m = +k+ +1;
    graphData.push({ x: months[k], y: monthArr[k] });
  }
  setExpenseData(graphData)
},[expenses])


useEffect(()=>{
  let profitData = []
  salesData.forEach((element,index) =>{
      let y = (element.y - expenseData[index].y)
      profitData[index] = {x: element.x, y:y}
  })

  setProfitData(profitData)


},[expenseData, salesData])


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
      <Segment style={{ height: "100vh", backgroundColor: "#f1f1f1"}}>
        <Header
          style={{ margin: 0, padding: 0, color: "#36393e"  }}
          content="Dashboard"
          subheader="Welcome to your Dashboard"
          as="h1"
        />
        <Divider />
        <Grid divided>
          <Grid.Column width={12}>
            <Grid centered columns={2} textAlign= {"center"}>
                <Grid.Column >
                  <Segment>
                    <Header
                      style={{
                        textAlign: "center",
                        color: "#77c90e",
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
                      style={{
                        textAlign: "center",
                        color: "#fd8166",
                        fontSize: 40
                      }}
                      size="large"
                      content={"$" + totalExpenseMonth}
                      subheader="Expenses This Month"
                    />
                  </Segment>
                </Grid.Column> 
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
                      content={itemsSold}
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
                      subheader="Most Popular Product Sold"
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
                      content={customers}
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
                          tickFormat={x => `$${x}`}
                        />
                        <VictoryArea
                          data={salesData}
                          interpolation="step"
                          labels={({ datum }) => "$" + datum.y}
                          theme={VictoryTheme.material}
                          style={{
                            data: {
                              fill:  "#76c80d"
                            }
                          }}
                        />
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
                          tickFormat={x => `$${x}`}
                        />
                        <VictoryArea
                          data={expenseData}
                          interpolation="step"
                          labels={({ datum }) => "$"+datum.y}
                          theme={VictoryTheme.material}
                          style={{
                            data: {
                              fill:  "#fd8166"
                            }
                          }}
                        />

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
                        <VictoryAxis label="Months" axisLabelComponent={<VictoryLabel renderInPortal dy={100}/>} />
                        <VictoryAxis
                          dependentAxis
                          axisLabelComponent={<VictoryLabel transform={40}/>}
                          // tickFormat specifies how ticks should be displayed
                          tickFormat={x => `$${x}`}
                          
                        />
                        <VictoryArea
                        domain={{x: [0, 11], y: [-500, 500]}}
                        domainPadding={{x: [10, -10], y: -100}}
                          interpolation="step"
                         data={profitData}
                          labels={({ datum }) => "$" + datum.y}
                          labelComponent={<VictoryLabel renderInPortal dy={-30}/>}
                          theme={VictoryTheme.material}
                          style={{
                            data: {
                              fill: "#fd8166"
                            }
                          }}
                        />
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
                  style={{ textAlign: "center", color: "#fd8166" }}
                  content="LATE ORDERS"
                />
                <Divider />
                {lateOrders.filter((element,id) => id < 5).map(element => {
                  let parts = element.dateNeededBy.split(/[/ :]/);

                  const monthName = (mon) => {
                    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mon - 1];
                 }
                  let month = monthName(parts[0])
               
                  return <Segment id={element.id}>
                     <Grid verticalAlign='middle'  columns={3}>
                      <Grid.Column width={2} textAlign={"center"}>
                        <Grid.Row>
                        <Header style={{fontSize: 10, color:"#fd8166"}}content={parts[2]}/>
                        </Grid.Row>
                         <Grid.Row>
                         <Header style={{fontSize: 20, color:"#fd8166"}} content={parts[1]}/>
                        </Grid.Row>
                        <Grid.Row>
                        <Header style={{fontSize: 10, color:"#fd8166"}}content={month}/>
                        </Grid.Row>
                      </Grid.Column>
                      <Grid.Column>
                      <Header  style={{textAlign:"center",   color:"#fd8166"}} content={element.name}/>
                      </Grid.Column>
                      <Grid.Column>
                      <Header centered as="h5" style={{  color:"#fd8166"}}content={element.items[0].name + ((element.items.length> 1) ? ", ..." : "")}/>
                      </Grid.Column>
                      </Grid>
                  </Segment>;
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
                {currentOrders.filter((item,id) => id < 5).map(element => {
                  let parts = element.dateNeededBy.split(/[/ :]/);

                  const monthName = (mon) => {
                    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mon - 1];
                 }
                  let month = monthName(parts[0])
                  return <Segment id={element.id}>
                      <Grid verticalAlign='middle'  columns={3}>
                      <Grid.Column width={2} textAlign={"center"}>
                        <Grid.Row>
                        <Header style={{fontSize: 10, color:"#74706d"}}content={parts[2]}/>
                        </Grid.Row>
                         <Grid.Row>
                         <Header style={{fontSize: 20, color:"#74706d"}} content={parts[1]}/>
                        </Grid.Row>
                        <Grid.Row>
                        <Header style={{fontSize: 10, color:"#74706d"}}content={month}/>
                        </Grid.Row>
                      </Grid.Column>
                      <Grid.Column >
                      <Header  style={{textAlign:"center", color:"#74706d"}} content={element.name}/>
                      </Grid.Column>
                      <Grid.Column>
                      <Header as="h5" style={{color:"#74706d"}} content={element.items[0].name + ((element.items.length> 1) ? ", ..." : "")}/>
                      </Grid.Column>
                      </Grid>
                    
                     </Segment>;
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
