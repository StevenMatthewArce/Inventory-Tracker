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
  Dashboard
} from './pages';
import { Sidebar } from './components';
import 'semantic-ui-css/semantic.min.css';


const App = () => {
  return (
    <div>
      <Router>
        <Sidebar />
        <Switch>
          <Route exact path='/dashboard'>
            <Dashboard/>
          </Route>
          <Route path='/inventory'>
            <Inventory/>
          </Route>
          <Route path='/budget'>
            <Budget/>
          </Route>
          <Route path='/reports'>
            <Reports/>
          </Route>
          <Route path='/recipes'>
            <Recipes/>
          </Route>
          <Route path='/orders'>
            <Orders/>
          </Route>
          <Route path='/goals'>
            <Goals/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
