import React, { Component } from 'react'
import { Icon,Avatar } from 'antd';
import "./header.css";
export default class Header extends Component {
    render() {
        return (
            <div style={{width:'100%',height:'10vh'}}>
                 <Avatar src="https://img.icons8.com/dotty/80/000000/address-book-2.png"/>
            </div>
        )
    }
}
