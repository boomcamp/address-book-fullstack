import React, { Fragment } from "react";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import { GroupName } from "../data/groupName";
import { Phone, AlternateEmail, LocationOn, Group } from "@material-ui/icons";

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px 30px 30px 30px;
  width: 100%;
  @media screen and (max-width: 750px) {
    flex-direction: column;
    padding: 10px;
    width: 100%;
  }
`;
const Span = styled.span`
  border: 2px solid #3f51b5;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
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
  justify-content: space-around;
  @media screen and (max-width: 1080px) {
    width: 49%;
  }
  @media screen and (max-width: 750px) {
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
      <div style={{ padding: "10px 30px 0 30px" }}>
        <Title>
          <span style={{ fontSize: "22px", ...capitalize }}>
            {rowData.first_name + " " + rowData.last_name}
          </span>
          <EditIcon
            style={{
              fontSize: "26px",
              color: "#3f51b5",
              padding: "0 5px 0 0",
              cursor: "pointer"
            }}
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
          <Label>Home Phone:</Label>
          <Span>
            <Phone style={icon} />
            {rowData.home_phone ? rowData.home_phone : "N/A"}
          </Span>
        </Row>
        <Row>
          <Label>Mobile Phone:</Label>
          <Span>
            <Phone style={icon} />
            {rowData.mobile_phone}
          </Span>
        </Row>
        <Row>
          <Label>Work Phone:</Label>
          <Span>
            <Phone style={icon} />
            {rowData.work_phone ? rowData.work_phone : "N/A"}
          </Span>
        </Row>
        <Row>
          <Label>Email Address:</Label>
          <Span>
            <AlternateEmail style={icon} />
            {rowData.email}
          </Span>
        </Row>
        <Row>
          <Label>City:</Label>
          <Span style={capitalize}>
            <LocationOn style={icon} />
            {rowData.city}
          </Span>
        </Row>
        <Row>
          <Label>State or Province:</Label>
          <Span style={capitalize}>
            <LocationOn style={icon} />
            {rowData.state_or_province}
          </Span>
        </Row>
        <Row>
          <Label>Postal Code:</Label>
          <Span style={capitalize}>
            <LocationOn style={icon} />
            {rowData.postal_code}
          </Span>
        </Row>
        <Row>
          <Label>Country:</Label>
          <Span style={capitalize}>
            <LocationOn style={icon} />
            {rowData.country}
          </Span>
        </Row>
        <Row>
          <Label>Group:</Label>
          <Span>
            <Group style={icon} />
            <span
              style={
                rowData.group_id ? {} : { color: "#b22", fontStyle: "italic" }
              }
            >
              <GroupName group_id={rowData.group_id} user={user} />
            </span>
          </Span>
        </Row>
      </Div>
    </Fragment>
  );
};

const icon = {
  margin: "0 5px 0 0",
  padding: "0 5px 0 0",
  color: "#3f51b5",
  borderRight: "2px solid gray"
};

const capitalize = {
  textTransform: "capitalize"
};
