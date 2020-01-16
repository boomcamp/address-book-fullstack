import React from "react";
import "bulma/css/bulma.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

export default function Viewer({ values }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div className="viewer column is-12">
          <div className="box">
            <figure className="avatar">
              <Avatar className={classes.avatar}>
                {`${String(values.firstname).charAt(0)}${String(
                  values.lastname
                ).charAt(0)}`}
              </Avatar>
            </figure>
            <h3 className="title has-text-black">
              <span href="#" target="_blank">
                Profile
              </span>
              {"  "}
              &nbsp;Viewer
            </h3>
            <div id="bio"></div>
            <br />
            <table className="table details">
              <tr>
                <td>First Name:</td>
                <td>
                  <span id="points" className="tag is-info">
                    {values.firstname}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>
                  <span id="points" className="tag is-info">
                    {values.lastname}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Email Address:</td>
                <td>
                  <span id="points" className="tag is-info">
                    {values.email}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Home Phone No:</td>
                <td>
                  <span id="points" className="tag is-warning">
                    {values.home_phone}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Mobile Phone No:</td>
                <td>
                  <span id="points" className="tag is-light">
                    {values.mobile_phone}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Work Phone No:</td>
                <td>
                  <span id="points" className="tag is-danger">
                    {values.work_phone}
                  </span>
                </td>
              </tr>
            </table>

            <br />
            <h3 className="is-size-4">Address</h3>
            <table className="table details">
              <tr>
                <td>City:</td>
                <td>{values.city}</td>
              </tr>
              <tr>
                <td>State or Province:</td>
                <td>{values.state_or_province}</td>
              </tr>
              <tr>
                <td>Postal Code:</td>
                <td>{values.postal_code}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{values.country}</td>
              </tr>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles(theme => ({
  card: {
    width: "32.5%",
    background: "transparent",
    boxShadow: "none",
    padding: "0!important"
  },
  "@media (max-width: 992px)": {
    card: {
      width: "80%!important",
      marginTop: "20px!important",
      marginBottom: "100px!important",
      margin: "0 auto!important"
    }
  },
  cardContent: {
    padding: "0!important"
  },
  avatar: {
    width: "150px",
    height: "150px",
    fontSize: "4.25rem",
    backgroundColor: "#3e51b5"
  }
}));
