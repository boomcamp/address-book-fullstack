import React, { Fragment } from "react";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import { GroupName } from "../data/groupName";

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;
const Span = styled.span`
  border: 2px solid #3f51b5;
  border-radius: 5px;
  padding: 7px 10px 4px 10px;
`;
const Label = styled.label`
  padding: 3px;
  font-size: 15px;
  color: #3f51b5;
  font-style: italic;
`;
const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ContactDetails = props => {
  const { rowData, setContact, setAction, setDialog, user } = props;
  return (
    <Fragment>
      <div style={{ padding: "10px 10px 0 10px" }}>
        <Title>
          <span style={{ fontSize: "22px" }}>Contact Details</span>
          <EditIcon
            style={{ fontSize: "26px", color: "#3f51b5", padding: "0 5px 0 0" }}
            onClick={() => {
              setContact(rowData);
              setAction("edit");
              setDialog(true);
            }}
          />
        </Title>
      </div>
      <Div>
        <Row>
          <Label>Name:</Label>
          <Span>{rowData.first_name + " " + rowData.last_name}</Span>
        </Row>
        <Row>
          <Label>Home Phone:</Label>
          <Span>{rowData.homme_phone ? rowData.homme_phone : "N/A"}</Span>
        </Row>
        <Row>
          <Label>Mobile Phone:</Label>
          <Span>{rowData.mobile_phone}</Span>
        </Row>
        <Row>
          <Label>Work Phone:</Label>
          <Span>{rowData.work_phone ? rowData.work_phone : "N/A"}</Span>
        </Row>
        <Row>
          <Label>Email Address:</Label>
          <Span>{rowData.email}</Span>
        </Row>
        <Row>
          <Label>City:</Label>
          <Span>{rowData.city}</Span>
        </Row>
        <Row>
          <Label>State or Province:</Label>
          <Span>{rowData.state_or_province}</Span>
        </Row>
        <Row>
          <Label>Postal Code:</Label>
          <Span>{rowData.postal_code}</Span>
        </Row>
        <Row>
          <Label>Country:</Label>
          <Span>{rowData.country}</Span>
        </Row>
        <Row>
          <Label>Group:</Label>
          <Span>
            {rowData.group_id ? (
              <GroupName group_id={rowData.group_id} user={user} />
            ) : (
              "Not assigned"
            )}
          </Span>
        </Row>
      </Div>
    </Fragment>
  );
};
