import React from "react";
import "bulma/css/bulma.css";
import { Card, CardContent, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

export default function Viewer({ values }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div className="viewer column is-12">
          <div className="box">
            <figure className="avatar">
              <Avatar className={classes.avatar}>
                {`${String(values.firstname)
                  .charAt(0)
                  .toUpperCase()} ${
                  values.lastname
                    ? String(values.lastname)
                        .charAt(0)
                        .toUpperCase()
                    : ""
                }`}
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
              <tbody>
                <tr>
                  <td>First Name:</td>
                  <td>
                    <span id="points" className="tag is-info">
                      {values.firstname
                        ? capitalize(String(values.firstname))
                        : null}
                    </span>
                  </td>
                </tr>
                {values.lastname ? (
                  <tr>
                    <td>Last Name:</td>
                    <td>
                      <span id="points" className="tag is-info">
                        {capitalize(String(values.lastname))}
                      </span>
                    </td>
                  </tr>
                ) : null}
                {values.email ? (
                  <tr>
                    <td>Email Address:</td>
                    <td>
                      <span id="points" className="tag is-info">
                        {values.email}
                      </span>
                    </td>
                  </tr>
                ) : null}
                {values.home_phone ? (
                  <tr>
                    <td>Home Phone No:</td>
                    <td>
                      <span id="points" className="tag is-warning">
                        {values.home_phone}
                      </span>
                    </td>
                  </tr>
                ) : null}
                {values.mobile_phone ? (
                  <tr>
                    <td>Mobile Phone No:</td>
                    <td>
                      <span id="points" className="tag is-light">
                        {values.mobile_phone}
                      </span>
                    </td>
                  </tr>
                ) : null}
                {values.work_phone ? (
                  <tr>
                    <td>Work Phone No:</td>
                    <td>
                      <span id="points" className="tag is-danger">
                        {values.work_phone}
                      </span>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
            <br />
            {values.city ||
            values.state_or_province ||
            values.postal_code ||
            values.country ? (
              <h3 className="is-size-4">Address</h3>
            ) : null}
            <table className="table details">
              <tbody>
                {values.city ? (
                  <tr>
                    <td>City:</td>
                    <td>{values.city}</td>
                  </tr>
                ) : null}
                {values.state_or_province ? (
                  <tr>
                    <td>State or Province:</td>
                    <td>{values.state_or_province}</td>
                  </tr>
                ) : null}
                {values.postal_code ? (
                  <tr>
                    <td>Postal Code:</td>
                    <td>{values.postal_code}</td>
                  </tr>
                ) : null}
                {values.country ? (
                  <tr>
                    <td>Country:</td>
                    <td>{values.country}</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles(() => ({
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
