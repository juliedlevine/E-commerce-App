import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Home.actions';
import { Link } from 'react-router';

class Cart extends React.Component {

    getCartTotal() {
        let total = 0;
        this.props.shopping_cart.map((item, index) => {
            total += item.price;
        })
        return total;
    }

    componentDidMount() {
        this.props.getCart(this.props.token);
    }

    render() {
        return (
            <div className="shoppingCart">
                <h3 className="cartHeading">Shopping Cart</h3>
                <table>
                    <tbody>
                        <tr className="tableHeaders">
                            <th></th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th className="deleteCol"></th>
                        </tr>
                    {this.props.shopping_cart.map((item, index) =>
                        <tr>
                            <td><img className="cartImage" alt="cart thumbnail" key={index} src={item.image_url}></img></td>
                            <td>{item.name}</td>
                            <td>1</td>
                            <td>${item.price}.00</td>
                            <td onClick={()=> this.props.deleteFromCart(item, this.props.token)}className="deleteCol">x</td>
                        </tr>
                    )}
                        <tr>
                            <td colSpan="3">Subtotal</td>
                            <td colSpan="2">${this.getCartTotal()}.00</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={()=> this.props.checkout(this.props.token)}>Checkout</button>
            </div>
        )
    }
}

const CartContainer = ReactRedux.connect(
    state => state,
    actions
)(Cart);

export default CartContainer;
