import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import EmployeeSearch from './Components/EmployeeSearch'
import EployeeOverview from './Components/EployeeOverview'

class App extends React.Component {
  inputRef = React.createRef()

  handleClick = () => {
    console.log(this.inputRef.current.value)
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={EmployeeSearch} />
          <Route exact path="/eployeeoverview" component={EployeeOverview} />
        </Switch>
        
        
      </Router>
    );
  }
}


export default App;
