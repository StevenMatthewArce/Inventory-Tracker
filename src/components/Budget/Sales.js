import React, { Component } from "react";
import { db } from "../Firebase";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory";
import _, { flatMap, floor, negate } from "lodash";


function renderTable(documents){
  //var month = new Date();
  var catagories = _.groupBy(documents, items =>{
    let parts = items.date.split(/[/ :]/);
    let month = parts[0];
    return month;
  });
  let data = catagories;
  var idk = {};
  //for(var value in data){
  {Object.keys(data).map((value,index)=>{
    const items = data[value];
    let totalExpense = 0;

    items.forEach(element => {
      totalExpense += parseFloat(element.totalCost);
    })
    totalExpense = totalExpense.toFixed(2);
    idk[value] = totalExpense;
   //Insert Graph
  //render() {
  })}return idk};

  export default class Sales extends Component{
    
    constructor(){
      super();
      let idk = getData();

    var data= [];
    for(let k in idk){
      data.push({x:k, y:idk[k]})
      console.log(k)
    }
   // console.log(data);

      this.state = {
        data : data
        categories 
        //data: [{x: Object.keys(idk),y:Object.values(idk)} ],
        //data: [{x:"sunday", y: 3},{x:"mon", y:4}]
      }
    }
    componentDidMount(){
        db.collection('receipts')//.get().then(querySnapshot => {
            .onSnapshot(snap=>{
              let documents = [];
              snap.forEach(doc=>{
                documents.push({...doc.data(),id:doc.id});
                //renderTable(doc);
              }).then(()=>this.setState({data:documents}))
              //data = renderTable(documents);
              //data: catagories
            })
        };

        calculateExpenseMonth=()=>{
          const{data} = this.state;
          var catagories = _.groupBy(data, items =>{
            let parts = items.date.split(/[/ :]/);
            let month = parts[0];
            return month;
          });
          let data = catagories;
          var idk = {};
          //for(var value in data){
          {Object.keys(data).map((value,index)=>{
            const items = data[value];
            let totalExpense = 0;
        
            items.forEach(element => {
              totalExpense += parseFloat(element.totalCost);
            })
            totalExpense = totalExpense.toFixed(2);
            idk[value] = totalExpense;
           //Insert Graph
          //render() {
          })}
        }
    
    render(){
      return(
        <div>
          <h1>Expense Line Chart</h1>
          <VictoryChart>
            <VictoryLine data = {this.state.data}
            height = {100}
            //interpolation="natural"
            //labels={({ datum }) => datum.y}
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
  //export default Sales;

/* export class Sales extends Component {
  render() {
    return <div></div>;
  }
}

export default Sales; */
