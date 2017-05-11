import React from 'react';
import { Link, IndexLink } from 'react-router';
import * as ReactRedux from 'react-redux';
import * as actions from './pages/Home.actions';

class AppLayout extends React.Component {

    render() {
        return (
            <div>
            {this.props.token ?
                <p className="userName">Hi, {this.props.first_name}</p> :
                <div></div>}

                <ul className="nav">
                    <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                    <li>{this.props.token ?
                        <Link onClick={this.props.logout} to="">Log Out</Link> :
                        <Link onClick={this.props.toggleLogin} to="">Log In</Link> }
                    </li>

                    <li><Link to="/signup" activeClassName="active">Sign Up</Link></li>
                    <div className="cart">
                        <Link to="/cart">
                            <img src="/shopping-cart.svg"></img>
                            <div>{this.props.cart}</div>
                        </Link>
                    </div>

                </ul>

                {this.props.showLogin ?
                    <div className="login">
                        Email: <input onChange={(event) => this.props.typing(event, 'email')} type="text"></input>
                        Password: <input onChange={(event) => this.props.typing(event, 'password')}type="password"></input>
                        <button onClick={()=> this.props.submitLogin(this.props.email, this.props.password)}>Submit</button>
                    </div> :
                    <h1 className="title">LUCYMAIL</h1>}

                <div className="main">
                    {this.props.children}
                </div>

                <div className="footer">
                    <p>This website is a clone of lucymail.us and was created as a learning exercise by Julie Dyer at the coding bootcamp DigitalCrafts. All images and intellectual property belong to Lucy Halcomb. Please visit Lucy's store to purchase her products.</p>
                </div>
            </div>
        )
    }
}

const AppLayoutContainer = ReactRedux.connect(
    state => state,
    actions
)(AppLayout);

export default AppLayoutContainer;
