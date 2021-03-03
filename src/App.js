import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
import {
  Budget,
  Inventory,
  Orders,
  Dashboard,
  Settings} from './pages';
import { Grid, Sidebar, Segment } from 'semantic-ui-react';
import { Sidenav, Header } from './components/Navigation';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
  }
   
  toggleMenu =() => {
    this.setState({toggle: !this.state.toggle})
  }
  
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
                    <Route exact path='/'>
                      <Dashboard />
                    </Route>
                    <Route path='/inventory'>
                      <Inventory />
                    </Route>
                    <Route path='/budget'>
                      <Budget />
                    </Route>
                    <Route path='/orders'>
                      <Orders />
                    </Route>
                    <Route path='/settings'>
                      <Settings />
                    </Route>
                    <Route path='/addItem'>
                      <AddItem />
                    </Route>
                  </Switch>
                </Segment>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid>
      </Router>
      </div>
      <div main>

      </div>
      </div>
    )
  }
}
export default App;
