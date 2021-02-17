import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Sidebar } from './components';
import { Budget, Inventory, Reports, Recipes, Orders } from './pages';

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
          <Route path='/Recipes'>
            <Recipes />
          </Route>
          <Route path='/orders'>
            <Orders />
          </Route>
        </Switch>
        </div>
      </Router>
    )
  }
}

export default App;