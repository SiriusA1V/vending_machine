import React, { Component } from 'react';

import './style.css';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div className="v-mainheader-div">
                <div className="v-mainheader-div_mainIcon">
                    <b>VendingMachine</b>
                </div>
            </div>
        )
    }
}

export default ListItem;