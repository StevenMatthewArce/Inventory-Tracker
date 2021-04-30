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
      //let idk = getData();

  //   var data= [];
  //   for(let k in idk){
  //     data.push({x:k, y:idk[k]})
  //     console.log(k)
  //   }
  //  // console.log(data);

       this.state = {
         data : [],
         graphData: []
        //categories 
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
    // componentDidMount(){
    //     db.collection('receipts')//.get().then(querySnapshot => {
    //         .onSnapshot(snap=>{
    //           let documents = [];
    //           snap.forEach(doc=>{
    //             documents.push({...doc.data(),id:doc.id});
    //             //renderTable(doc);
    //           })
    //           .then(()=>this.setState({data:documents}))
    //           .then(() => this.calculateExpenseMonth());
    //           //data = renderTable(documents);
    //           //data: catagories
    //         })
    //     };

        calculateExpenseMonth=()=>{
          const{data} = this.state;
          
          let monthArr = new Array(12).fill(0);
          for(let k =0 ; k<monthArr.length; k++){
            let totalExpenseMonth = 0;
            let totalExpenseYear = 0;
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
              if (year == cur_year) {
                totalExpenseYear += parseFloat(element.totalCost);
              }
            })
            monthArr[k] = (totalExpenseMonth);
          }
          var graphDatal = [];
          for(let k in monthArr){
            let m = +k+ +1;
            graphDatal.push({x:(m), y:monthArr[k]})
          }
          this.setState({graphData: graphDatal});
          };
  
   // console.log(data);

      //this.state = {
        //data : data

          // const{data} = this.state;
          // var catagories = _.groupBy(data, items =>{
          //   let parts = items.date.split(/[/ :]/);
          //   let month = parts[0];
          //   return month;
          // });
          // let data = catagories;
          // var idk = {};
          // //for(var value in data){
          // {Object.keys(data).map((value,index)=>{
          //   const items = data[value];
          //   let totalExpense = 0;
        
          //   items.forEach(element => {
          //     totalExpense += parseFloat(element.totalCost);
          //   })
          //   totalExpense = totalExpense.toFixed(2);
          //   idk[value] = totalExpense;
           //Insert Graph
          //render() {
         // })}
        //}
    
    render(){
      return(
        <div>
          <h1>Expense Line Chart</h1>
          <VictoryChart>
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
  //export default Sales;

/* export class Sales extends Component {
  render() {
    return <div></div>;
  }
}

export default Sales; */
