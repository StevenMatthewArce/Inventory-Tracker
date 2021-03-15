import React from "react";
import ReactDOM from 'react-dom';
import { VictoryBar } from 'victory';

import { Button, Tab } from "semantic-ui-react";
import { Link } from 'react-router-dom';

const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];
  
  class Dashboard extends React.Component {
    render() {
      return (
        <div> <h1>Dashboard</h1>
          <VictoryBar
          data={data}
          // data accessor for x values
          x="quarter"
          // data accessor for y values
          y="earnings"
        />
        </div>
      )
    }
  }

export default Dashboard;
