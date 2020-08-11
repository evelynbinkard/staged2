import React, {Component} from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getRunwayModelsQuery = gql`
    {
        runwayModels{
            firstName
            lastName
            id
        }
    }
`

class AddLook extends Component {
  displayRunwayModels(){
      var data = this.props.data;

      if (data.loading) {
          return (<option disabled>loading models</option>);
      } else {
        return data.runwayModels.map(model => {
            return (
                <option key={model.id} value={model.id }>{ model.firstName } {model.lastName}</option>
            )
        })
      }
  }
  render(){
    return (
      <>
        <form id="add-look-form">
           
            <div className="field">
                <label>Look Description</label>
                <input type="text"></input>
            </div>
            <div className="field">
                <label>Collection</label>
                <input type="text"></input>
            </div>
            <div className="field">
                <label>Order in Collection</label>
                <input type="text"></input>
            </div>
            <div className="field">
                <label>Assign Model</label>
                <select>
                    <option>Select Model</option>
                    {this.displayRunwayModels()}
                </select>
            </div>
            
        </form>
        
        <button>+</button>
      </>
    );
  }
}

export default graphql(getRunwayModelsQuery)(AddLook);
