import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getRunwayModelsQuery, addLookMutation, getLooksQuery } from '../queries/queries';

class AddLook extends Component {

    constructor(props){
        super(props);
        this.state = {
            lookDescription: '',
            collection: '',
            orderInShow: '',
            assignedRunwayModelId: ''
        }
    }

    displayRunwayModels(){
      var data = this.props.getRunwayModelsQuery;

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

    submitForm(e) {
        e.preventDefault();
        this.props.addLookMutation({
            variables: {
                description: this.state.lookDescription,
                designerCollection: this.state.collection,
                orderInShow: Number(this.state.orderInShow),
                assignedRunwayModelId: this.state.assignedRunwayModelId
            },
            refetchQueries: [ {query: getLooksQuery} ]
        });
    }

    render(){
        return (
        <>
            <form id="add-look-form" onSubmit={this.submitForm.bind(this)}>
            
                <div className="field">
                    <label>Look Description</label>
                    <input type="text" onChange={(e) => this.setState({lookDescription: e.target.value})}></input>
                </div>
                <div className="field">
                    <label>Collection</label>
                    <input type="text" onChange={(e) => this.setState({collection: e.target.value})}></input>
                </div>
                <div className="field">
                    <label>Order in Collection</label>
                    <input type="text" onChange={(e) => this.setState({orderInShow: e.target.value})}></input>
                </div>
                <div className="field">
                    <label>Assign Model</label>
                    <select onChange={(e) => this.setState({assignedRunwayModelId: e.target.value})}>
                        <option>Select Model</option>
                        {this.displayRunwayModels()}
                    </select>
                </div>
                <button>+</button>

            </form>
            
        </>
        );
  }
}

export default compose(
    graphql(getRunwayModelsQuery, { name: "getRunwayModelsQuery" }),
    graphql(addLookMutation, { name: "addLookMutation" })
)(AddLook);
