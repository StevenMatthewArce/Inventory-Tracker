import React, { Component } from "react";
import { db } from "../Firebase";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory";
import _, { flatMap, floor, negate } from "lodash";

export default class Sales extends Component {
      
  constructor(){
    super();

     this.state = {
       data : [],
       graphData: []
      //data: [{x: Object.keys(idk),y:Object.values(idk)} ],
      //data: [{x:"sunday", y: 3},{x:"mon", y:4}]
    }
  }
  componentDidMount() {
    let documents = [];
    db.collection("receipts")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
          // console.log(doc.id, " => ", doc.data());
        });
      })
      .then(() => this.setState({ data: documents }))
      .then(() => this.calculateExpenseMonth());
    }  

      calculateExpenseMonth=()=>{
        const{data} = this.state;
        
        let monthArr = new Array(12).fill(0);
        for(let k =0 ; k<monthArr.length; k++){
          let totalExpenseMonth = 0;
          //let totalExpenseYear = 0;
          var currentdate = new Date();
          var cur_month = k+1;
          var cur_year = currentdate.getFullYear();
          data.filter(element => {
            let parts = element.date.split(/[/ :]/);
            let month = parts[0];
            let year = parts[2];
            if (cur_month == month && year == cur_year) {
              totalExpenseMonth += parseFloat(element.totalCost);
            }
            // if (year == cur_year) {
            //   totalExpenseYear += parseFloat(element.totalCost);
            // }
          })
          monthArr[k] = (totalExpenseMonth);
        }
        var graphDatal = [];
        for(let k in monthArr){
          let months = ['Jan','Feb','Mar', 'Apr', 'May','June','July','Aug', 'Sep','Oct', 'Nov', 'Dec'];
          //let m = +k+ +1;
          graphDatal.push({x:months[k], y:monthArr[k]})
        }
        this.setState({graphData: graphDatal});
        };
  
  render(){
    return(
      <div>
        <h1>Expense Line Chart</h1>
        <VictoryChart>
         <VictoryAxis
              label = "Months"
            />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickFormat={(x) => `$${x}`}
            /> 
          <VictoryLine data = {this.state.graphData}
          height = {10}
          //interpolation="natural"
          labels={({ datum }) => datum.y}
          theme={VictoryTheme.material}
          style={{
            data: {
              stroke: "#02B875"
            }
          }}/>
          {/* height={1} width={4} */}
        </VictoryChart>
      </div>
    )
  }
}
//   render() {
//     return <div></div>;
//   }
// }

// export default Sales;
