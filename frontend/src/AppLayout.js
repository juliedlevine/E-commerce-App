import React from 'react';
import { Link, IndexLink } from 'react-router';
import * as ReactRedux from 'react-redux';
import * as actions from './pages/Home.actions';

class AppLayout extends React.Component {

    render() {
        return (
            <div>
                <ul className="nav">

                    {this.props.token ?
                        <li className="userName">Hi, {this.props.first_name}</li> :
                        <li></li>}

                    <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                    <li onClick={this.props.toggleLogin}>Log In</li>
                    <li><Link to="#">Sign Up</Link></li>
                </ul>

                {this.props.showLogin ?
                    <div className="login">
                        Email: <input onChange={(event) => this.props.emailTyping(event)} type="text"></input>
                        Password: <input onChange={(event) => this.props.passwordTyping(event)}type="password"></input>
                        <button onClick={()=> this.props.submitLogin(this.props.email, this.props.password)}>Submit</button>
                    </div> :
                    <h1 className="title">LUCYMAIL</h1>}

                <div className="main">
                    {this.props.children}
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
