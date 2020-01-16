import React, { Component } from 'react'

export default class Search extends Component {
   
    render() {
        return (
            <div>
                <input onChange={e=>this.props.search(e)}/>
            </div>
        )
    }
}
