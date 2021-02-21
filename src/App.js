import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {
  Budget,
  Inventory,
  Reports,
  Recipes,
  Orders,
  Goals,
  Dashboard,
  Settings
} from './pages';
import { Grid, Sidebar, Segment } from 'semantic-ui-react';
import { Sidenav } from './components';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
  render() {
    console.log(process.env.REACT_APP_API_KEY)
    return (
      <Router>
        <Grid columns={1}>
          <Grid.Column>
            <Sidebar.Pushable as={Segment}>
              <Sidenav />
              <Sidebar.Pusher>
                <Segment basic>
                  <Switch>
                    <Route exact path='/'>
                      <Dashboard />
                    </Route>
                    <Route path='/inventory'>
                      <Inventory />
                    </Route>
                    <Route path='/budget'>
                      <Budget />
                    </Route>
                    <Route path='/reports'>
                      <Reports />
                    </Route>
                    <Route path='/recipes'>
                      <Recipes />
                    </Route>
                    <Route path='/orders'>
                      <Orders />
                    </Route>
                    <Route path='/goals'>
                      <Goals />
                    </Route>
                    <Route path='/settings'>
                      <Settings />
                    </Route>
                  </Switch>
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid>
      </Router>
    )
  }
}
export default App;
