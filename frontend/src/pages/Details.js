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
                        <button className="add-cart">Add to cart</button>
                    </div>
                </div>
                <div className="footer">
                    <p>This website is a clone of lucymail.us and was created as a learning exercise by Julie Dyer at the coding bootcamp DigitalCrafts. All images and intellectual property belong to Lucy Halcomb. Please visit Lucy's store to purchase her products.</p>
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
