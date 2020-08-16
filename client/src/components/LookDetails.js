import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getLookQuery } from '../queries/queries';

class LookDetails extends Component {
  
    displayLookDetails() {
        const {look} = this.props.data
        if (look) {
            return (
                <div>
                <h2>{ look.description }</h2>
                <p>Assigned Model:</p>
                <p>{ look.assignedRunwayModel.firstName } { look.assignedRunwayModel.lastName }</p>
                <p>Designer Collection:</p>
                <p>{ look.designerCollection }</p>
                <p>All other looks assigned to model:</p>
                <ul className="other-looks">
                    { 
                        look.assignedRunwayModel.looks.map(item => {
                            return (
                                <li key={ item.id }> { item.description }</li>
                            )
                        })
                    }
                </ul>
                </div>
            )
        } else {
            return <p>No look selected</p>
        }
    }
  render(){
      console.log(this.props)
    return (
      <>
        { this.displayLookDetails() }
      </>
    );
  }
}

export default graphql(getLookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.lookId
            }
        }
    }
})(LookDetails);
