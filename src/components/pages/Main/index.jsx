import React, { Component } from 'react';

import './style.css';

import MainHeader from '../../organisms/MainHeader';
import VendingMachine from '../../organisms/VendingMachine';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div className="p-main-div">
            <MainHeader/>
            <VendingMachine 
                juice_list={this.props.juice_list} 
                setMinus={this.props.setMinus} 
                is_getJuice={this.props.is_getJuice} 
                delJuice={this.props.delJuice}
                initJuice={this.props.initJuice}
                updJuice={this.props.updJuice}/>
            </div>
        )
    }
}

export default Main;