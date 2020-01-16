import React, { useState } from 'react';
import Fab from "@material-ui/core/Fab";
import { Dialog, DialogContent, DialogActions, TextField, DialogTitle } from "@material-ui/core";
import {Button, ButtonGroup} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Visibility } from '@material-ui/icons';
import Hidden from '@material-ui/core/Hidden';

function ViewContact({data}) {

  const useStyles = makeStyles(theme => ({
    view: {
      color: '#fff',
      background: '#3d6dd0',
      '&:hover': {
        background: '#2a4d94'
      }
    },
  }));

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <React.Fragment>
      <Hidden only={['xs', 'sm']} >
        <Fab size="medium" onClick={handleClickOpen} className={classes.view} aria-label="view">
          <Visibility />
        </Fab>
      </Hidden>
      <Hidden only={['xl', 'lg', 'md']}>
        <ButtonGroup size="small" variant="text">
          <Button onClick={handleClickOpen} style={{color: '#3d6dd0'}}>
            <Visibility />
          </Button>
        </ButtonGroup>
      </Hidden>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="Add-Contact-Dialog" maxWidth='md' fullWidth>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {data.ab_lastName+ ", " + data.ab_firstName}
        </DialogTitle>
          <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    label="First Name"
                    value={(data.ab_firstName) ? data.ab_firstName : ''}
                    type="text"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <TextField
                    label="Last Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={(data.ab_lastName) ? data.ab_lastName : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    label="Home Number"
                    type="text"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={(data.ab_home_phone) ? data.ab_home_phone : ''}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    label="Mobile Number"
                    type="text"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={(data.ab_mobile_phone) ? data.ab_mobile_phone : ''}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <TextField
                    label="Work Number"
                    type="text"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={(data.ab_work_phone) ? data.ab_work_phone : ''}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    label="Email address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={(data.ab_email) ? data.ab_email : ''}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <TextField
                    label="City"
                    type="text"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={(data.ab_city) ? data.ab_city : ''}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <TextField
                    label="State"
                    type="text"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={(data.ab_state) ? data.ab_state : ''}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <TextField
                    label="Country"
                    type="text"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={(data.ab_country) ? data.ab_country : ''}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <TextField
                    label="Postal Code"
                    type="text"
                    fullWidth
                    variant="outlined" 
                    InputProps={{
                      readOnly: true,
                    }} 
                    value={(data.ab_postal_code) ? data.ab_postal_code : ''}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default ViewContact;
