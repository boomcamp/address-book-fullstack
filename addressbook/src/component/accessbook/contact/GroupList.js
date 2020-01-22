import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBIcon, MDBCardBody } from "mdbreact";
import Add from '../contact/GroupControl/addmember';
import View from '../contact/GroupControl/viewmember';
export default class GroupList extends Component {
    getData = () => {
        this.props.getData();
    }
    render() {
        const userid = localStorage.getItem('id');
        const id = parseInt(userid);
        return (
            <React.Fragment>
                <MDBRow>
                    <MDBCol sm="12" >
                        <div className="header z-depth-2 rounded border border-info"><h3 className="blue-text pr-3"> <MDBIcon icon="address-book" /> <b>GROUPS</b></h3></div>
                    </MDBCol>
                    <br /><br />
                    <MDBCol sm="12">
                        <MDBRow className="mt-1 mx-auto">
                            {this.props.group.map(res => (
                                res.userId === id ?
                                <MDBCol sm="3" key={res.groupId} className="mt-3 Box-Contact">
                                    <div className="shadow-box-example z-depth-2 border border-info rounded">
                                        <MDBRow>
                                            <MDBCol sm="12">
                                                <MDBCardBody className="border border-info rounded">
                                                    {res.groupName}
                                                </MDBCardBody>
                                                <div className="border border-info rounded">
                                                    <View getData={this.getData} groupName={res.groupName} groupId={res.groupId} groupMember={this.props.groupMember} />
                                                    <Add getData={this.getData} data={this.props.data} MembertoAdd={this.props.MembertoAdd} groupId={res.groupId} groupMember={this.props.groupMember} />
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    </div>
                                </MDBCol>
                                :
                                null
                            ))}
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </React.Fragment>
        )
    }
}
