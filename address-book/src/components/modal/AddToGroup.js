import React, { Component } from 'react'
import {Dialog} from "@material-ui/core"

export default class AddToGroup extends Component {
    constructor(props) {
        super(props)
    
        // this.state = {
             
        // }
    }
    
    
    render() {
        return (
            <Dialog open={this.props.openModal} onClose={this.props.handleCloseModal}>
                <h1>asdf</h1>
            </Dialog>
        )
    }
}
