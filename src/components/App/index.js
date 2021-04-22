import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid, Sidebar, Segment } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

import * as ROUTES from "../../constants/routes";
import { Sidenav, Header } from "../Navigation";

import { Dashboard } from "../Dashboard";
import { Inventory, AddItem, AddRecipe } from "../Inventory";
import { Orders, AddOrder } from "../Orders";
import { Budget, AddReceipt } from "../Budget";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
  }

  toggleMenu = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  render() {
    return (
      <div className="App">
        <Header onToggleMenu={this.toggleMenu} />
        <div sideBar="ui attached pushable">
          <Router>
            <Grid columns={1}>
              <Grid.Column>
                <Sidebar.Pushable as={Segment}>
                  <Sidenav toggleMenu={this.state.toggle} />
                  <Sidebar.Pusher>
                    <Segment padded>
                      <Switch>
                        <Route
                          exact
                          path={ROUTES.DASHBOARD}
                          component={Dashboard}
                        />
                        <Route path={ROUTES.INVENTORY} component={Inventory} />
                        <Route path={ROUTES.BUDGET} component={Budget} />
                        <Route path={ROUTES.ORDERS} component={Orders} />
                        <Route path={ROUTES.ADDITEM} component={AddItem} />
                        <Route path={ROUTES.ADDRECEIPT} component={AddReceipt} />
                        <Route path={ROUTES.ADDORDER} component={AddOrder} />
                        <Route path={ROUTES.ADDRECIPE} component={AddRecipe} />
                      </Switch>
                    </Segment>
                  </Sidebar.Pusher>
                </Sidebar.Pushable>
              </Grid.Column>
            </Grid>
          </Router>
        </div>
      </div>
    );
  }
}
export default App;