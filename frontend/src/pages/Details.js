import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Home.actions';

class Details extends React.Component {
    componentDidMount() {
        this.props.getDetails(this.props.params.id);
    }

    render() {
        return (
            <div>
                <div className="details">
                    <img className="product-image" alt="envelope" src={this.props.details.image_url}></img>
                    <div className="product-info">
                        <h2>{this.props.details.name}</h2>
                        <div>---</div>
                        <h2>${this.props.details.price}.00</h2>
                        <p>{this.props.details.description}</p>
                        <ul>
                            <li>envelope dimensions {this.props.details.envelope_dimension}</li>
                            <li>card dimensions {this.props.details.card_dimension}</li>
                            <li>made in the U.S.A.</li>
                        </ul>
                        <button onClick={()=> this.props.addToCart(this.props.details.id, this.props.token)}className="add-cart">Add to cart</button>
                    </div>
                </div>
            </div>
        );
    }
}

const DetailsContainer = ReactRedux.connect(
    state => state,
    actions
)(Details);

export default DetailsContainer;
