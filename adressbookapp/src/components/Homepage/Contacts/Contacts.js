import React, { Component } from "react";
import "./contact.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
export default class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="root">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className="paper">xs=12</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className="paper">xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className="paper">xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className="paper">xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className="paper">xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className="paper">xs=6 sm=3</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper className="paper">xs=6 sm=3</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
