import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Grid, Sidebar, Segment } from 'semantic-ui-react';
import * as ROUTES from './constants/routes';
import * as Pages from './pages';
import * as InventoryComponents from './components/InventoryComponents';
import { Sidenav, Header } from './components/Navigation';
import 'semantic-ui-css/semantic.min.css';

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
     <div className = "App">
      <Header onToggleMenu = {this.toggleMenu}/>
      <div sideBar ="ui attached pushable">
        <Router>
          <Grid columns={1}>
            <Grid.Column>
              <Grid.Row></Grid.Row>
              <Sidebar.Pushable as={Segment}>
                <Sidenav toggleMenu = {this.state.toggle}/>
                <Sidebar.Pusher>
                  <Segment padded>
                    <Switch>
                      <Route exact path={ROUTES.DASHBOARD} component={Pages.Dashboard} />
                      <Route path={ROUTES.INVENTORY} component={Pages.Inventory} />
                      <Route path={ROUTES.BUDGET} component={Pages.Budget} />
                      <Route path={ROUTES.ORDERS} component={Pages.Orders} />
                      <Route path={ROUTES.SETTINGS} component={Pages.Settings} />
                      <Route path={ROUTES.ADDITEM} component={InventoryComponents.AddItem} />
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
