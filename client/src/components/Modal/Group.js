import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MDBBtn, MDBCol } from "mdbreact";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

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

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Dialog open={this.props.clickToOpen} onClose={this.props.handleClose}>
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
                      id="groupName"
                      name="group_name"
                      label="Group Name"
                      fullWidth
                      onChange={this.props.editOnchange}
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
            <Button onClick={this.props.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
