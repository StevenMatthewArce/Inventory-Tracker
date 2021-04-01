import React from "react";
import { Grid, Progress, Statistic } from "semantic-ui-react";

function ExpenseGraphs() {
  return (
    <div>
      <Grid centered columns={2}>
        <Grid.Column>
          <Grid.Row verticalAlign="top">
            <Statistic
              size="mini"
              color="orange"
              value="$1,000"
              label="Total Expense This Month"
            />

            <Statistic
              floated="right"
              size="mini"
              color="grey"
              value="$10,000"
              label="Total Expense This Year"
            />
          </Grid.Row>

          <Grid.Row verticalAlign="bottom">
            <Progress color="orange" percent={33} />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column>
          <Grid.Row verticalAlign="top">
            <Statistic
              size="mini"
              color="olive"
              value="$1,000"
              label="Total Expense This Year"
            />

            <Statistic
              floated="right"
              size="mini"
              color="grey"
              value="$10,000"
              label="Total Sales"
            />
          </Grid.Row>

          <Grid.Row verticalAlign="bottom">
            <Progress color="olive" percent={33} />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default ExpenseGraphs;
