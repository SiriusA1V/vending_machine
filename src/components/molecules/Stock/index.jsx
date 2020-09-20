import React, { Component } from 'react';

import './style.css';

import { Dialog, Button, IconButton, TextField, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import Icon from '@material-ui/core/Icon'

const S3_URL = "https://vending-machine-choe.s3-ap-northeast-1.amazonaws.com/";

class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            col : ["name", "quantity", "price", "image"],
            juice_list : [],
            ownUpdate : true,   //props更新制御
            isAddBT : true,
            isSccss : false,
        }   
    }

    static getDerivedStateFromProps=(props, state)=>{
        if(state.ownUpdate){  
            return {
                juice_list : props.juice_list
            };
        }else{
            return null;            
        }        
    }

    onClickImg=(e)=>{
        document.getElementById("file"+e.target.name).click();
    }

    //テキスト編集ハンドル
    onchange_handle=(e)=>{
        this.setState({
            juice_list : this.state.juice_list.map(
                (info, key) => ""+key === e.target.name.split("/")[0]
                ? ({...info, [e.target.name.split("/")[1]] : e.target.value})
                : info
            ),
            ownUpdate : false
        })
    }

    //ファイルアップロードハンドル
    onChangeImg=(e)=>{
        var input = e.target;
        var reader = new FileReader();
        var isSet = false;
        var base64 = null;
        var idx = e.target.name;

        if(input.files[0] !== undefined){

            if((input.files[0].type).split("/")[0] === "image"){
                isSet = true;
            }else{
                e.target.value = "";
                alert("ファイルを確認してください。");
                return;
            }

            reader.readAsBinaryString(input.files[0])

            reader.onload = () => {
                base64 = btoa(reader.result);

                this.setState({
                    juice_list : this.state.juice_list.map(
                        (info, key) => ""+key === idx
                        ? ({...info, ["image"] : base64})
                        : info
                    ),
                    ownUpdate : false
                })
            }            
        }
    }

    //リスト追加
    addList=()=>{
        var base = {"name" : "", "quantity" : 0, "price" : 0, "image" : ""};

        this.setState({
            juice_list : [
                ...this.state.juice_list,
                base
            ],
            isAddBT : false,
            ownUpdate : false
        })
    }

    delJuiceList=(targetRow)=>{          
        if(targetRow.id === undefined){
            var popJuiceList = [...this.state.juice_list];
            popJuiceList.pop();

            this.setState({
                juice_list : popJuiceList,
                isAddBT : true,
                ownUpdate : false
            })
        }else{
            this.props.delJuice(targetRow);            
        }
    }

    updateJuiceList=(targetRow)=>{
        if(!(/^-?[0-9]+$/.test(targetRow.quantity)) || parseInt(targetRow.quantity) < 0 ||
            !(/^-?[0-9]+$/.test(targetRow.price)) || parseInt(targetRow.price) < 0 ||
            targetRow.image === ""){

                alert("正しい情報を入れてください。");
                return;
        }

        if(targetRow.id === undefined){
            this.props.initJuice(targetRow, this.resetIsList);
        }else{
            this.props.updJuice(targetRow, this.resetIsList);
        }
    }

    resetIsList=()=>{
        this.setState({            
            ownUpdate : true,
            isAddBT : true,
            isSccss : true
        })
    }

    resetisSccss=()=>{
        this.setState({
            isSccss : false
        })
    }

    render() {
        {/*在庫管理コンポネント*/}
        return(
            <div className="v-stock-div">
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {
                                this.state.col.map((val2,key2) => {                                    
                                    return(
                                        <TableCell key={key2} colSpan={val2==="image" ? "3" : "1"}>
                                        {val2}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {                            
                            this.state.juice_list.map((val, key) => {
                                return(
                                    <TableRow key={key}>                                        
                                        {
                                            this.state.col.map((val2,key2) => {
                                                var url = "";

                                                {/*リスト出力制御*/}
                                                if(val2 === "image"){
                                                    if(val[val2].split("/")[0] === "juice-image"){ url = S3_URL+val[val2];
                                                    }else if(val[val2] === ""){ url = require("./image/img.png");
                                                    }else{ url = "data:image/png;base64, "+val[val2]; }

                                                    return(
                                                        <TableCell key={key+"/"+key2}>
                                                        <input type="file" style={{display:"none"}} id={"file"+key} name={key} onChange={this.onChangeImg}></input>
                                                        <input type="image" 
                                                            src={url} 
                                                            alt="" className={"v-stock-img"} 
                                                            name={key} 
                                                            onClick={this.onClickImg}></input>
                                                        </TableCell>
                                                    )
                                                }else{
                                                    return(
                                                        <TableCell key={key+"/"+key2}>
                                                        <TextField
                                                        margin="dense"
                                                        variant="outlined"
                                                        name={key + "/" + val2}
                                                        value={val[val2]}
                                                        onChange={this.onchange_handle}
                                                        style={{margin:"-10px"}}
                                                        >
                                                        </TextField>
                                                        </TableCell>
                                                    )
                                                }
                                            })
                                        }
                                        <TableCell>
                                            <Button onClick={()=>this.updateJuiceList(val)}>反映</Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={()=>this.delJuiceList(val)}>削除</Button>                                            
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                        {/*リスト追加ファーム*/}
                        {
                            this.state.isAddBT && this.state.juice_list.length < 20 ? 
                            <TableRow key={"addRow"} >
                                <TableCell colSpan="6" style={{textAlign:"center"}}>
                                    <IconButton size="small" onClick={this.addList}><Icon style={{ fontSize: 30 }}>+</Icon></IconButton>
                                </TableCell>
                            </TableRow>
                            :
                            null
                        }
                    </TableBody>
                    </Table>

                <Dialog
                    open={this.state.isSccss}
                    onClose={this.resetisSccss}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <b style={{margin:"4px"}}>反映されました。</b>                 
                </Dialog>  
            </div>
        )
    }
}

export default Stock;