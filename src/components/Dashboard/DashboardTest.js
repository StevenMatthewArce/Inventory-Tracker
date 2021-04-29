import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryContainer
} from "victory";

const profit = [
  { quarter: 1, earnings: 1500 },
  { quarter: 2, earnings: 4500 },
  { quarter: 3, earnings: 2000 },
  { quarter: 4, earnings: 5500 }
];

const inventory = [
  { quarter: 1, goodsAmt: 50 },
  { quarter: 2, goodsAmt: 60 },
  { quarter: 3, goodsAmt: 30 },
  { quarter: 4, goodsAmt: 70 }
];

class Dashboard extends React.Component {
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <h1>Dashboard</h1>
        <VictoryChart
          //adding the material theme provided with victory
          theme={VictoryTheme.material}
          // domainPadding will add space to each side of VictoryBar to
          // prevent it from overlapping the axis
          domainPadding={20}
          height={300}
          width={400}
          containerComponent={<VictoryContainer responsive={false} />}
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
            tickFormat={x => `$${x / 1000}k`}
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
          height={300}
          width={400}
          containerComponent={<VictoryContainer responsive={false} />}
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
            tickFormat={x => `${x}%`}
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
    );
  }
}
export default Dashboard;
