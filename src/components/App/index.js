import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid, Sidebar, Segment } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";

import * as ROUTES from "../../constants/routes";
import { Sidenav, Header } from "../Navigation";

import { Dashboard } from "../Dashboard";
import { Inventory, AddItem, AddRecipe, AddFinishedGood } from "../Inventory";
import { Orders, AddOrder } from "../Orders";
import { Budget, AddReceipt } from "../Budget";

import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";

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
      <div style={{background:"#f1f1f1", overflow:"hidden"}}>
        <Header onToggleMenu={this.toggleMenu} />
        <div style={{overflow: "auto",paddingRight: "20px"}}>
        <AuthProvider >
          <Router>
            <Grid columns={1}>
              <Grid.Column>
                <Sidebar.Pushable as={Segment}>
                  <Sidenav toggleMenu={this.state.toggle} />
                  <Sidebar.Pusher>
                    <Switch>
                      <Route exact path={ROUTES.LOGIN} component={LogIn} />
                      <Route exact path={ROUTES.SIGNUP} component={SignUp} />
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
                      <Route
                        path={ROUTES.ADDFINISHEDGOOD}
                        component={AddFinishedGood}
                      />
                    </Switch>
                  </Sidebar.Pusher>
                </Sidebar.Pushable>
              </Grid.Column>
            </Grid>
          </Router>
        </AuthProvider>
        </div>
      </div>
    );
  }
}
export default App;
