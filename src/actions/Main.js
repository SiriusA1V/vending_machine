import React, { Component } from 'react';
import Api from '../Api';

import Page from '../components/pages/Main';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            main_comp : '',
            value: null,
            juice_list : [],
            is_getJuice : false            
        }

        this.getJListCB();
    }

    //api돌아갈때의 블록 판단할 스테이터랑 변경할 함수 추가
    //액션메인이랑, 페이지의 상관관계에대해 한번더 생각하기

    setJuiceList=(e)=>{
        this.setState({
            juice_list : e,
            is_getJuice : false
        })
    }
    getJListCB=()=>{
        Api.getJuiceList(this.setJuiceList)
    }

    delJuice=(juiceInfo, callback)=>{        
        Api.delJuice(juiceInfo, this.getJListCB);
    }

    initJuice=(juiceInfo, callback)=>{
        Api.initJuice(juiceInfo, this.getJListCB, callback);
    }

    updJuice=(juiceInfo, callback)=>{
        Api.updJuice(juiceInfo, this.getJListCB, callback);
    }

    //ジュースの在庫-1
    //後でAPI処理に編集
    setMinus=(juiceInfo, callback)=>{
        var save_data = {...juiceInfo};

        this.setState({
            is_getJuice : true
        })
        
        Api.buyJuice(save_data, this.getJListCB, callback);     
    }

    render() {
        console.log(this.state.juice_list)
        return (
            <Page
                main_comp={this.state.main_comp}
                value={this.state.value}
                juice_list={this.state.juice_list}
                setMinus={this.setMinus}
                is_getJuice={this.state.is_getJuice}
                delJuice={this.delJuice}
                initJuice={this.initJuice}
                updJuice={this.updJuice}
            />
        );
    }
}

export default Main;