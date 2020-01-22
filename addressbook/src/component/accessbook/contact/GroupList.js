import React, { Component } from 'react'
import { MDBRow, MDBCol, MDBIcon, MDBCardBody } from "mdbreact";
import Add from '../contact/GroupControl/addmember';
import View from '../contact/GroupControl/viewmember';
import Del from '../contact/GroupControl/deletegroup';
export default class GroupList extends Component {
    getData = () => {
        this.props.getData();
    }
    NotifyDeleteGroup = () => {
        this.props.NotifyDeleteGroup()
    }
    render() {
        const userid = localStorage.getItem('id');
        const id = parseInt(userid);
        return (
            <React.Fragment>
                <MDBRow>
                    <MDBCol sm="12" >
                        <div className="header z-depth-2 rounded border border-info cfd8dc blue-grey lighten-4"><h3 className="blue-text pr-3"> <MDBIcon icon="address-book" /> <b>GROUPS</b></h3></div>
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
                                                <MDBCardBody className="border border-info rounded b0bec5 blue-grey lighten-3">
                                                    {res.groupName}
                                                </MDBCardBody>
                                                <div className="border border-info rounded cfd8dc blue-grey lighten-4">
                                                    <View getData={this.getData} groupName={res.groupName} groupId={res.groupId} groupMember={this.props.groupMember} />
                                                    <Add getData={this.getData} data={this.props.data} MembertoAdd={this.props.MembertoAdd} groupId={res.groupId} groupMember={this.props.groupMember} />
                                                    <Del getData={this.getData} groupId={res.groupId} NotifyDeleteGroup={this.NotifyDeleteGroup}/>
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
