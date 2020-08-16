import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getLookQuery } from '../queries/queries';

class LookDetails extends Component {

  render(){
    return (
      <>
        <p>Output details here</p>
      </>
    );
  }
}

export default graphql(getLookQuery)(LookDetails);
