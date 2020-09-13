import React, { Component } from 'react';

import Main from './actions/Main';

class Route extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    switchPage() {        
        return (
            <Main
                changePage={this.props.changePage}
            />
        );
    }

    render() {
        return (
            <>{this.switchPage()}</>
        );
    }
}

export default Route;
