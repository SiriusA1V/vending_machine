import React, { Component } from 'react';
import Api from '../Api';

import Page from '../components/pages/Main';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            main_comp : '',
            value: null,
            juice_list : Api.getJuiceList()
        }
    }

    //ジュースの在庫-1
    //後でAPI処理に編集
    setMinus=(juiceId)=>{
        var save_arr = [];
        save_arr = this.state.juice_list;

        this.state.juice_list.forEach((val, idx) => {
            if(val.id === juiceId){
                save_arr[idx].quantity = (--save_arr[idx].quantity)
            }
        })

        this.setState({
            juice_list : save_arr
        })
    }

    render() {
        console.log(this.state.juice_list)
        return (
            <Page
                main_comp={this.state.main_comp}
                value={this.state.value}
                juice_list={this.state.juice_list}
                setMinus={this.setMinus}
            />
        );
    }
}

export default Main;