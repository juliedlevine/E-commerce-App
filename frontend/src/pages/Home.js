import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Home.actions';
import { Link } from 'react-router';

class Home extends React.Component {
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        return (
            <div>
                <div className="products">
                    {this.props.products.map((image, index) =>
                        <Link key={index} to="/shop/"><img className="each_product" alt={image.description} key={index} src={image.image_url}></img></Link>
                    )}
                </div>
                <div className="footer">
                    <p>This website is a clone of lucymail.us and was created as a learning exercise by Julie Dyer at the coding bootcamp DigitalCrafts. All images and intellectual property belong to Lucy Halcomb. Please visit Lucy's store to purchase her products.</p>
                </div>
            </div>
        );
    }
}

const HomeContainer = ReactRedux.connect(
    state => state,
    actions
)(Home);

export default HomeContainer;
