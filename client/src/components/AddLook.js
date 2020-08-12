import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getRunwayModelsQuery } from '../queries/queries';

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

    submitForm(e) {
        e.preventDefault();
        console.log(this.state);
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

export default graphql(getRunwayModelsQuery)(AddLook);
