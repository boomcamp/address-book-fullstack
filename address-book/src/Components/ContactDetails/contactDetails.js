import React, { useEffect } from "react";
import AppBarAddress from "../AppBar/appBarAddress";
import Swal from "sweetalert2";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 12
  }
});

export default function ContactDetails() {
  const classes = useStyles();
  if (!localStorage.getItem("Token")) {
    Swal.fire({
      icon: "warning",
      title: "You must login first"
    }).then(function() {
      window.location = "/";
    });
  }

  if (!localStorage.getItem("Token")) {
    return null;
  } else {
    return (
      <div>
        <div style={{ display: "flex", margin: "50px auto" }}>
          <Grid container spacing={1}>
            <Container>
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      Contact Details
                    </Typography>
                    <Typography variant="h5" component="h2"></Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small" color="primary" variant="outlined">
                      Edit Contact
                    </Button>
                  </CardActions> */}
                </Card>
              </Grid>
            </Container>
          </Grid>
        </div>
      </div>
    );
  }
}
