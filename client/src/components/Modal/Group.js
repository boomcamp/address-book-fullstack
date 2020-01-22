import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MDBBtn, MDBCol } from "mdbreact";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import AccountBox from "@material-ui/icons/AccountBox";
import Home from "@material-ui/icons/Home";
import Work from "@material-ui/icons/Work";
import "react-toastify/dist/ReactToastify.min.css";
import LocationOn from "@material-ui/icons/LocationOn";
import { FaMobileAlt, FaCity } from "react-icons/fa";

import { MdEmail } from "react-icons/md";

const Form = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;
const Input = styled.div`
  padding: 5px;
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

const Item = styled.div`
  padding: 10px 20px 10px 20px;
  width: 50%;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

export default class Edit extends React.Component {
  render() {
    const { rowInfo } = this.props;
    return (
      <div>
        <Dialog open={this.props.clickOpen1} onClose={this.props.clickClose1}>
          <DialogTitle
            id="alert-dialog-title"
            style={{
              marginLeft: 25
            }}
          >
            {"Add Group"}
          </DialogTitle>
          <MDBCol>
            <form onSubmit={this.props.addGroupHandler}>
              <DialogContent
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Form>
                  <Input>
                    <TextField
                      type="text"
                      id="group_name"
                      name="group_name"
                      label="Group Name"
                      fullWidth
                      onChange={this.props.myChangeHandler1}
                      required
                    />
                  </Input>
                </Form>
                <div className="text-center mt-4">
                  <MDBBtn className="submit" color="indigo" type="submit">
                    Add Group
                  </MDBBtn>
                </div>
              </DialogContent>
            </form>
          </MDBCol>
          <DialogActions>
            <Button onClick={this.props.clickClose1} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.props.clickOpen5} onClose={this.props.clickClose5}>
          <DialogTitle
            id="alert-dialog-title"
            style={{
              marginLeft: 25
            }}
          >
            {"Edit Group"}
          </DialogTitle>
          <MDBCol>
            <form onSubmit={this.props.editGroupName}>
              <DialogContent
                style={{
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Form>
                  <Input>
                    <TextField
                      type="text"
                      id="group_name"
                      name="group_name"
                      label="Group Name"
                      fullWidth
                      onChange={this.props.myChangeHandler1}
                      required
                    />
                  </Input>
                </Form>
                <div className="text-center mt-4">
                  <MDBBtn className="submit" color="indigo" type="submit">
                    Edit Group
                  </MDBBtn>
                </div>
              </DialogContent>
            </form>
          </MDBCol>
          <DialogActions>
            <Button onClick={this.props.clickClose5} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.props.clickOpen2} onClose={this.props.clickClose2}>
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this group?"}
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={this.props.clickClose2} color="primary">
              No
            </Button>
            <Button onClick={this.props.deleteGroup} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.props.clickOpen3} onClose={this.props.clickClose3}>
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this contact?"}
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={this.props.clickClose3} color="primary">
              No
            </Button>
            <Button
              onClick={this.props.deleteHandler}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.props.clickOpen4}
          onClose={this.props.clickClose4}
          maxWidth={"md"}
          fullWidth
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{
              color: "#0c47a1",
              marginLeft: 25
            }}
          >
            {"Contact Details"}
          </DialogTitle>
          <DialogContent dividers>
            <Box>
              <Item>
                <span
                  style={{
                    width: "100%",
                    fontFamily: "helvetica",
                    fontStyle: "Italic"
                  }}
                >
                  <AccountBox />
                  {"   "}
                  {rowInfo ? rowInfo.fname + " " + rowInfo.lname : ""}
                </span>
              </Item>
              <Item>
                <span
                  style={{
                    width: "100%",
                    fontFamily: "helvetica",
                    fontStyle: "Italic"
                  }}
                >
                  <Work />
                  {"   "}
                  {rowInfo ? rowInfo.work_phone : ""}
                </span>
              </Item>
            </Box>
            <Box>
              <Item>
                <span
                  style={{
                    width: "100%",
                    fontFamily: "helvetica",
                    fontStyle: "Italic"
                  }}
                >
                  <Home />
                  {"   "}
                  {rowInfo ? rowInfo.home_phone : ""}
                </span>
              </Item>
              <Item>
                <span
                  style={{
                    width: "100%",
                    fontFamily: "helvetica",
                    fontStyle: "Italic"
                  }}
                >
                  <FaMobileAlt size={25} />
                  {"   "}
                  {rowInfo ? rowInfo.mobile_phone : ""}
                </span>
              </Item>
            </Box>
            <Box>
              <Item>
                <span
                  style={{
                    width: "100%",
                    fontFamily: "helvetica",
                    fontStyle: "Italic"
                  }}
                >
                  <MdEmail size={25} />
                  {"   "}
                  {rowInfo ? rowInfo.email : ""}
                </span>
              </Item>
              <Item>
                <span
                  style={{
                    width: "100%",
                    fontFamily: "helvetica",
                    fontStyle: "Italic"
                  }}
                >
                  <FaCity size={25} />
                  {"   "}
                  {rowInfo ? rowInfo.city : ""}
                </span>
              </Item>
            </Box>
            <Box>
              <Item>
                <span
                  style={{
                    width: "100%",
                    fontFamily: "helvetica",
                    fontStyle: "Italic"
                  }}
                >
                  <LocationOn />
                  {"   "}
                  {rowInfo ? rowInfo.state_or_province : ""}
                </span>
              </Item>
              <Item>
                <span
                  style={{
                    width: "100%",
                    fontFamily: "helvetica",
                    fontStyle: "Italic"
                  }}
                >
                  <LocationOn />
                  {"   "}
                  {rowInfo ? rowInfo.country : ""}
                </span>
              </Item>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.clickClose4} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
