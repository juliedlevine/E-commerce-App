import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Home.actions';
import { Link } from 'react-router';

class Home extends React.Component {
    componentDidMount() {
        this.props.getProducts();
        this.props.getCart(this.props.token);
    }

    render() {
        return (
            <div>
                <div className="products">
                    {this.props.products.map((image, index) =>
                        <Link key={index} to={"/shop/" + (index + 1)}><img className="each_product" alt={image.description} key={index} src={image.image_url}></img></Link>
                    )}
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
