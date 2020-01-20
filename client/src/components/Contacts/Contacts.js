import React from "react";
import Modal from "../Modal/Modal";
import Filter from "../Filter/Filter";
import Table from "../Table/Table";

export default class Contacts extends React.Component {
  render() {
    return (
      <div>
        <Filter changeHandler={this.props.changeHandler} />
        <Table
          search={this.props.search}
          contact={this.props.contact}
          groupData={this.props.groupData}
          handleModalOpen={this.props.handleModalOpen}
        />
        <Modal
          isModal={this.props.isModal}
          currentData={this.props.currentData}
          createContactHandler={this.props.createContactHandler}
          editContactHandler={this.props.editContactHandler}
          deleteContactHandler={this.props.deleteContactHandler}
          addToGroupHandler={this.props.addToGroupHandler}
          addAGroup={this.props.addAGroup}
          editGroup={this.props.editGroup}
          editGroupHandler={this.props.editGroupHandler}
          deleteGroup={this.props.deleteGroup}
          deleteGroupHandler={this.props.deleteGroupHandler}
          addAGroupHandler={this.props.addAGroupHandler}
          changeHandler={this.props.changeHandler}
          selectHandler={this.props.selectHandler}
          handleModalClose={this.props.handleModalClose}
          deleteContact={this.props.deleteContact}
          addToGroup={this.props.addToGroup}
          groups={this.props.groups}
        />
      </div>
    );
  }
}
