import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Sidebar } from './components';
import { Budget, Inventory, Reports } from './pages';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Sidebar />
        <div>
        <Switch>
          <Route path='/budget'>
            <Budget />
          </Route>
          <Route path='/inventory'>
            <Inventory />
          </Route>
          <Route path='/reports'>
            <Reports />
          </Route>
        </Switch>
        </div>
      </Router>
    )
  }
}

export default App;