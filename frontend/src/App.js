import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import Home from './components/Home';
import TableView from './components/TableView';
import ChartsView from './components/ChartsView';
import Navigation from './components/Navigation';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/tableview" component={TableView}/>
             <Route path="/chartsview" component={ChartsView}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;