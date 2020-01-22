import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MDBCol, MDBCardBody } from "mdbreact";
import { Div } from "../Styled-Component/style";
import MailIcon from "@material-ui/icons/Mail";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import WorkIcon from "@material-ui/icons/Work";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FlagIcon from "@material-ui/icons/Flag";

export default class Edit extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { handleDetailClose, handleDetailOpen, rowValue } = this.props;
    return (
      <Div>
        <Dialog
          open={handleDetailOpen}
          onClose={handleDetailClose}
          maxWidth={"sm"}
        >
          <DialogTitle id="alert-dialog-title">{"Contact Detail"}</DialogTitle>
          <MDBCol>
            <MDBCardBody>
              <DialogContent dividers>
                <Typography>Details:</Typography>
                <Typography>
                  <PersonIcon />: {rowValue ? rowValue.first_name : ""}{" "}
                  {rowValue ? rowValue.last_name : ""}
                </Typography>
                <Typography>
                  <MailIcon />: {rowValue ? rowValue.email : ""}
                </Typography>
              </DialogContent>
              <DialogContent dividers>
                <Typography>Contacts:</Typography>
                <Typography>
                  <HomeIcon />: {rowValue ? rowValue.home_phone : ""}
                </Typography>
                <Typography>
                  <PhoneAndroidIcon />: {rowValue ? rowValue.mobile_phone : ""}
                </Typography>
                <Typography>
                  <WorkIcon />: {rowValue ? rowValue.work_phone : ""}
                </Typography>
              </DialogContent>
              <DialogContent dividers>
                <Typography>Location:</Typography>
                <Typography>
                  <LocationCityIcon />: {rowValue ? rowValue.city : ""}
                </Typography>
                <Typography>
                  <LocationOnIcon />:{" "}
                  {rowValue ? rowValue.state_or_province : ""}
                </Typography>
                <Typography>
                  <FlagIcon />: {rowValue ? rowValue.country : ""}
                </Typography>
              </DialogContent>
            </MDBCardBody>
          </MDBCol>
        </Dialog>
      </Div>
    );
  }
}
