import React from 'react';
import { Sidebar } from './components';
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
import { FlexboxGrid } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const App = () => {
  return (
    <div>
      <FlexboxGrid justify="space-between">
        <Router>
          <FlexboxGrid.Item colspan={4}>
            <Sidebar />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={12}>
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
            </Switch>
          </FlexboxGrid.Item>
        </Router>
      </FlexboxGrid>
      
    </div>
  )
}

export default App;