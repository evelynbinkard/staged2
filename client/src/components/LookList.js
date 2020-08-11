import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getLooksQuery } from '../queries/queries';

class LookList extends Component {
  displayLooks(){
      var data = this.props.data;
      if (data.loading) {
          return (<div>loading looks...</div>);
      } else {
        return data.looks.map(look => {
            return (
                <li key={look.id}>{ look.description }</li>
            )
        })
      }
  }
  render(){
    return (
      <>
        <ul id="look-list">
            { this.displayLooks() }
        </ul>
      </>
    );
  }
}

export default graphql(getLooksQuery)(LookList);
