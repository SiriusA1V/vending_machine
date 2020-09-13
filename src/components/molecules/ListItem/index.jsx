import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';

import './style.css';

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item : this.props.item
        }
    }

    //マウス反応イベント
    //後でCSSに修正
    mouseOverEvent=()=>{
        var paper = document.getElementById("paper"+this.state.item.id);
        paper.style.marginLeft="0%";
        paper.style.width="60px";
        paper.style.height="70px";
    }

    mouseOutEvent=()=>{
        var paper = document.getElementById("paper"+this.state.item.id);
        paper.style.marginLeft="10%";
        paper.style.width="50px";
        paper.style.height="67px";
    }

    mouseDownEvent=()=>{
        var paper = document.getElementById("paper"+this.state.item.id);
        paper.style.marginLeft="10%";
        paper.style.width="50px";
        paper.style.height="67px";
    }

    mouseUpEvent=()=>{
        var paper = document.getElementById("paper"+this.state.item.id);
        paper.style.marginLeft="0%";
        paper.style.width="60px";
        paper.style.height="70px";
    }

    render() {
        {/*商品情報コンポネント*/}
        return(
            <div className="v-listitem-div" 
                style={this.props.amount >= this.state.item.price && this.state.item.quantity > 0? {boxShadow:"0px 5px 0px yellowgreen"} : {boxShadow:"none"}}>    

                <div className={this.state.item.quantity <= 0 ? "v-listitem-paper_div_cover" : null}></div> 
                <div className={this.props.amount < this.state.item.price && this.state.item.quantity > 0 ? "v-listitem-paper_div_cover2" : null}></div> 

                <Paper 
                    id={"paper"+this.state.item.id} 
                    className="v-listitem-paper" 
                    onClick={()=>this.props.pickJuice(this.state.item)} 
                    onMouseOver={this.mouseOverEvent} 
                    onMouseOut={this.mouseOutEvent}
                    onMouseDown={this.mouseDownEvent}
                    onMouseUp={this.mouseUpEvent}
                    >

                    <div className="v-listitem-paper_div">
                        <img className="v-listitem-img" src={this.state.item.image} alt=""/><br />                    
                        <b className="v-listitem-price">{this.state.item.price}</b>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default ListItem;