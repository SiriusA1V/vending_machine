import React, { Component } from 'react';

import Route from './Route';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          page_name : 'Main',
          value: null
        }
      }


    changePage = (page_name, value) => {
        this.setState({
            page_name: page_name,
            value: value
        });
    }

    render () {
        return (
          <Route
              page_name={this.state.page_name}
              changePage={this.changePage}
              value={this.state.value}
          />
        );
    }
}

export default App;
