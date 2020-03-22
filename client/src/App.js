import React, {Component} from 'react';

//components
import LookList from './components/LookList';

class App extends Component {
  render(){
    return (
      <div id="main">
        <h1>Models' Looks</h1>
        <LookList />
      </div>
    );
  }
}

export default App;
