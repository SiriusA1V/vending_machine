import React, { Component } from 'react';
import './style.css';

import {Dialog, TextField, Button, DialogTitle, DialogContent} from '@material-ui/core';

import ListItem from '../../molecules/ListItem';
import Stock from '../../molecules/Stock';

const S3_URL = "https://vending-machine-choe.s3-ap-northeast-1.amazonaws.com/";

class VendingMachine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount : 0,
            input_amount : 0,
            isSet_amount : false,
            isGive_change : false,
            is_push : false,
            ecobag_list : [],
            isSet_Stock : false
        }

        console.log(this.props.juice_list)
    }

    //ジュースを買った時の処理
    pickJuice=(e)=>{
        this.props.setMinus(e, this.payAmount);     
    }
    payAmount=(e)=>{
        this.setState({
            amount : (parseInt(this.state.amount) - parseInt(e.price)),
            ecobag_list : [
                ...this.state.ecobag_list,
                {...e}
            ]
        })
    }


    clickSetMount = () =>{
        this.setState({
            isSet_amount : true
        })
    }

    cancleSetMount = () =>{
        this.setState({
            isSet_amount : false,
            input_amount : 0
        })
    }

    writeAmount=(e)=>{
        this.setState({
            input_amount : e.target.value
        })
    }

    clickGiveChange=()=>{
        this.setState({
            isGive_change : true,
        })
    }

    resetAmount=()=>{
        this.setState({
            isGive_change : false,
            amount : 0
        })
    }

    clickPush=()=>{
        this.setState({
            is_push : true
        })
    }

    endPush=()=>{
        this.setState({
            is_push : false,
            ecobag_list : []
        })
    }

    endStock=()=>{
        this.setState({
            isSet_Stock : false
        })
    }

    clickSet=()=>{
        this.setState({
            isSet_Stock : true
        })
    }

    //投入処理
    setMount = () =>{
        if(/^-?[0-9]+$/.test(this.state.input_amount) && parseInt(this.state.input_amount ) >= 0){
            this.setState({
                isSet_amount : false,
                amount : (parseInt(this.state.amount) + parseInt(this.state.input_amount)),
                input_amount : 0,
            })
        }else{
            alert("正しい金額を書いてください。")
        }        
    }

    render() {
        {/* 自動販売機 */}
        return(
            <div className="v-vendingmachine-div_main">
                <div className="v-vendingmachine-div">
                    <div className="v-vendingmachine-div_content">
                        {/* ジュースのリスト出力 */}
                        <div className="v-vendingmachine-div_juicelist">
                            {this.props.juice_list.map(idx => {
                                return (
                                    <ListItem item={idx} key={idx.id} pickJuice={this.pickJuice} amount={this.state.amount} is_getJuice={this.props.is_getJuice}/>
                                );
                            })}
                        </div> 

                        {/* 投入、おつり機能 */}
                        <div className="v-vendingmachine-div_coin">
                            <div className="v-vendingmachine-div_amount">
                                <b style={{marginRight:"3px"}}>{this.state.amount}</b>
                            </div>
                            <input type="image" className="v-vendingmachine-button_coin" src={require("../../../image/coin.png")} alt="" onClick={this.clickSetMount} />
                            <input type="image" className="v-vendingmachine-button_change" src={require("../../../image/change.png")} alt="" onClick={this.clickGiveChange} />
                        </div>

                        {/* 商品出口 */}
                        <div className="v-vendingmachine-div_bottom">
                            <input 
                                type="image" 
                                className="v-vendingmachine-button_push" 
                                src={require("../../../image/push.png")} 
                                alt="" 
                                onClick={this.clickPush} 
                                style={this.state.ecobag_list.length > 0 ? {boxShadow:"0px 0px 15px yellowgreen"} : {boxShadow:"none"}}/>   
                        </div>

                        <input 
                            type="image" 
                            className="v-vendingmachine-button_set"
                            src={require("../../../image/set.png")}
                            alt=""
                            onClick={this.clickSet}
                            />
                    </div>
                </div>


                {/* お金の投入ファーム */}
                <Dialog
                    open={this.state.isSet_amount}
                    onClose={this.cancleSetMount}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <TextField id="standard-basic" label="金額を書いてください。" autoComplete="off" onChange={this.writeAmount} value={this.state.input_amount}/>
                <Button onClick={this.setMount}>投入</Button>                       
                </Dialog>

                {/* おつり掲示 */}
                <Dialog
                    open={this.state.isGive_change}
                    onClose={this.resetAmount}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <b style={{margin:"4px"}}>{this.state.amount}円のお返しになります。 </b>                 
                </Dialog>  

                {/* 購入掲示 */}
                <Dialog
                    open={this.state.is_push}
                    onClose={this.endPush}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle style={{textAlign:"center"}}>
                        購入リスト
                    </DialogTitle>
                    <DialogContent>
                    {
                        this.state.ecobag_list.map((val, idx)=>{
                            return (
                                <img className="v-vendingmachine-img_purchase" src={S3_URL+val.image} alt="" key={"ecbList"+val.id+idx} />
                            )
                        })
                    }
                    </DialogContent>             
                </Dialog>  

                {/* 在庫管理表示 */}
                <Dialog
                    open={this.state.isSet_Stock}
                    onClose={this.endStock}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Stock 
                        juice_list={this.props.juice_list} 
                        delJuice={this.props.delJuice}
                        initJuice={this.props.initJuice}
                        updJuice={this.props.updJuice}/>            
                </Dialog>                               
            </div>
        )
    }
}

export default VendingMachine;