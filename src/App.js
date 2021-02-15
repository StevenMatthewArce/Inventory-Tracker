import React from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Sidenav } from './components';

export default function App() {
  return (
    <Router>
      <div>
        <h1>Inventory Tracker</h1>
      </div>
    </Router>
  )
}