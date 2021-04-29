import { forEach, orderBy } from "lodash";
import React from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryContainer, VictoryLine } from 'victory';
import { db } from "../Firebase";
import { RawMaterials, FinishedGoods, Recipes } from "../Inventory";

function ytGetData(){
  this.ref = db.collection('receipts').get().then((snapshot)=>{
    let documents = [];
    snapshot.docs.forEach(doc=>{
      documents.push({...doc.data()})
    })
    documents = sortByMonth(documents);
  })
  
};

  function sortByMonth(documents){
    documents.sort((a,b)=>{
      let monthA = a.date.getMonth();
      let monthB = b.date.getMonth();
      return monthA - monthB;
    })
  return documents}


function getData(){
  //let datas = null;
  db.collection('receipts')
    .onSnapshot(snap=>{
      let documents = [];
      snap.forEach(doc=>{
        documents.push({...doc.data(),id:doc.id});
        //renderTable(doc);
      })
      renderTable(documents);
      //data: catagories
    })
};

function renderTable(documents){
  var catagories = _.groupBy(documents, items =>{
    return items.date.getMonth();
  });
  let data = catagories;
  var idk = {};
  //for(var value in data){
  {Object.keys(data).map((value,index)=>{
    const items = data[value];
    let totalExpense = 0;

    items.forEach(element => {
      totalCost += parseFloat(element.totalCost);
    })
    totalExpense = totalExpense.toFixed(2);
    idk[value] = totalExpense;
   //Insert Graph
  //render() {
  })}}

  export default class expenseVisual extends Component{
    constructor(){
      super();

    var data= [];
    for(let k in idk){
      data=[...data,{x:k, y:idk[k]}]
    }

      this.state = {
        data : data
        //}
        //data: [{x: Object.keys(idk),y:Object.values(idk)} ],
        //huuh: [{x:"sunday", y: 3},{x:"mon", y:4}]
      }
    }
    render(){
      return(
        <div>
          <h1>Expense Line Chart</h1>
          <VictoryChart>
            <VictoryLine data = {this.state.data}
            style={{
              data: {
                stroke: "#02B875"
              }
            }}/>
          </VictoryChart>
        </div>
      )
    }
  }

    
/*     render(){
    return (
      //<div style={{ height: '100vh' }}>
      <div>
        <h1>Visualization</h1>
          <VictoryChart
            //adding the material theme provided with victory
            theme={VictoryTheme.material}
            // domainPadding will add space to each side of VictoryBar to 
            // prevent it from overlapping the axis
            domainPadding={20}
            height={300} width={400}
            containerComponent={<VictoryContainer responsive={false}/>}
          >

            <VictoryAxis
              // tickValues specifies both the bumber of ticks and where
              // they are placed on the axis
              tickValues={[1, 2, 3, 4]}
              tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
            />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickFormat={(x) => `$${x/1000}k`}
            />

            <VictoryBar
              data={data}
              // data accessor for x values
              x="data.name"
              // data accessor for y values
              y="data.totalCost"
            />
            </VictoryChart>

            
            <VictoryChart
              //adding the material theme provided with victory
              theme={VictoryTheme.material}
              // domainPadding will add space to each side of VictoryBar to 
              // prevent it from overlapping the axis
              domainPadding={20}
              height={300} width={400}
              containerComponent={<VictoryContainer responsive={false}/>}
            >

              <VictoryAxis
                // tickValues specifies both the bumber of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4]}
                tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => `${x}%`}
              />

              <VictoryBar
                data={inventory}
                // data accessor for x values
                x="quarter"
                // data accessor for y values
                y="goodsAmt"
              />
              </VictoryChart>
        </div>
      )
  
  })};

 
    }


//}

// function selectingData(){
//   firebase.database().ref('items').on('value',
//   function(AllRecords){
//     AllRecords.forEach(
//       function(CurrentRecord){
//         var quantity = CurrentRecord.val().quantity;
//       }
//     )
//   })
// }

const profit = [
    {quarter: 1, earnings: 1500},
    {quarter: 2, earnings: 4500},
    {quarter: 3, earnings: 2000},
    {quarter: 4, earnings: 5500}
  ];

const inventory = [
    {quarter: 1, goodsAmt: 50},
    {quarter: 2, goodsAmt: 60},
    {quarter: 3, goodsAmt: 30},
    {quarter: 4, goodsAmt: 70}
  ];
  
  class expenseVisual extends React.Component {
    //componentDidMount() {
      //!Uncomment this when firebase is back up
      db.collection("items")
        .onSnapshot(snap => {
          let documents = [];
          snap.forEach(doc => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          var catagories = _.groupBy(documents, items => {
            return items.name;
          });
          this.setState({
            data: catagories
          });
        }
        );
      //!Uncomment this when firebase is back up
      // var catagories = _.groupBy(data, items => {
      //   return items.name;
      // });
      // // console.log(catagories);
      // this.setState({ data: catagories });
    //}


    render() {
      return (
        <div style={{ height: '100vh' }}>
          <h1>Dashboard</h1>
            <VictoryChart
              //adding the material theme provided with victory
              theme={VictoryTheme.material}
              // domainPadding will add space to each side of VictoryBar to 
              // prevent it from overlapping the axis
              domainPadding={20}
              height={300} width={400}
              containerComponent={<VictoryContainer responsive={false}/>}
            >

              <VictoryAxis
                // tickValues specifies both the bumber of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4]}
                tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => `$${x/1000}k`}
              />

              <VictoryBar
                data={profit}
                // data accessor for x values
                x="quarter"
                // data accessor for y values
                y="earnings"
              />
              </VictoryChart>
              <VictoryChart
                //adding the material theme provided with victory
                theme={VictoryTheme.material}
                // domainPadding will add space to each side of VictoryBar to 
                // prevent it from overlapping the axis
                domainPadding={20}
                height={300} width={400}
                containerComponent={<VictoryContainer responsive={false}/>}
              >

                <VictoryAxis
                  // tickValues specifies both the bumber of ticks and where
                  // they are placed on the axis
                  tickValues={[1, 2, 3, 4]}
                  tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                />
                <VictoryAxis
                  dependentAxis
                  // tickFormat specifies how ticks should be displayed
                  tickFormat={(x) => `${x}%`}
                />

                <VictoryBar
                  data={inventory}
                  // data accessor for x values
                  x="quarter"
                  // data accessor for y values
                  y="goodsAmt"
                />
                </VictoryChart>
          </div>
        )
      }
   } */
export default expenseVisual;
