import React from 'react';
// import { Link, IndexLink } from 'react-router';

class AppLayout extends React.Component {
    render() {
        return (
            <div>
                <h1>React App Template</h1>
                <div className="main">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default AppLayout;
