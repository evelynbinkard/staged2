import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//components
import LookList from './components/LookList';
import AddLook from './components/AddLook';

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Models' Looks</h1>
          <LookList />
          <AddLook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
