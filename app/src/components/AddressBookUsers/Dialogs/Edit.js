import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit({
    openEdit,
    editClose,
    Transition,
    fullScreen,
    fname,
    lname,
    home_phone,
    mobile_phone,
    work_phone,
    email,
    city,
    state,
    postal_code,
    country,
    user_id,
    id }) {
    const classes = useStyles();
    const [newData, setNewData] = React.useState({
        fname,
        lname,
        home_phone,
        mobile_phone,
        work_phone,
        email,
        city,
        state,
        postal_code,
        country,
        user_id
    });

    const handleEditChange = e => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value
        })
    }

    const onSave = () => {
        axios({
            method: 'patch',
            url: `http://localhost:3001/api/contacts/${id}`,
            data: newData
        })
            .then(() => (
                editClose()
            ))
            .catch(e => {
                toast.error("Fill-up all fields!", {
                    position: 'top-right',
                    hideProgressBar: true,
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
                <ToastContainer enableMulticontainer />
                <Dialog
                    open={openEdit}
                    TransitionComponent={Transition}
                    fullScreen={fullScreen}
                    keepMounted
                    onClose={editClose}
                    aria-labelledby="contact"
                    aria-describedby="contact"
                >
                    <DialogTitle id="contact">{`Edit Contact`}</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <div className={classes.display}>
                            <form className={classes.input} onSubmit={() => onSave()}>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                            <InputLabel htmlFor="fname">First Name</InputLabel>
                                            <OutlinedInput
                                                required
                                                id="fname"
                                                name="fname"
                                                type="fname"
                                                defaultValue={fname}
                                                onChange={handleEditChange}
                                                labelWidth={85}
                                            />
                                        </FormControl>
                                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                            <InputLabel htmlFor="lname">Last Name</InputLabel>
                                            <OutlinedInput
                                                required
                                                id="lname"
                                                name="lname"
                                                type="lname"
                                                defaultValue={lname}
                                                onChange={handleEditChange}
                                                labelWidth={85}
                                            />
                                        </FormControl>
                                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                            <InputLabel htmlFor="home_phone">Home Number</InputLabel>
                                            <OutlinedInput
                                                required
                                                id="home_phone"
                                                name="home_phone"
                                                type="number"
                                                defaultValue={home_phone}
                                                onChange={handleEditChange}
                                                labelWidth={115}
                                            />
                                        </FormControl>
                                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                            <InputLabel htmlFor="mobile_phone">Mobile Number</InputLabel>
                                            <OutlinedInput
                                                required
                                                id="mobile_phone"
                                                name="mobile_phone"
                                                type="number"
                                                defaultValue={mobile_phone}
                                                onChange={handleEditChange}
                                                labelWidth={115}
                                            />
                                        </FormControl>
                                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                            <InputLabel htmlFor="work_phone">Work Number</InputLabel>
                                            <OutlinedInput
                                                required
                                                id="work_phone"
                                                name="work_phone"
                                                type="number"
                                                defaultValue={work_phone}
                                                onChange={handleEditChange}
                                                labelWidth={105}
                                            />
                                        </FormControl>
                                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                            <InputLabel htmlFor="email">Email</InputLabel>
                                            <OutlinedInput
                                                required
                                                id="email"
                                                name="email"
                                                type="email"
                                                defaultValue={email}
                                                onChange={handleEditChange}
                                                labelWidth={105}
                                            />
                                        </FormControl>
                                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                            <InputLabel htmlFor="city">City</InputLabel>
                                            <OutlinedInput
                                                required
                                                id="city"
                                                name="city"
                                                type="city"
                                                defaultValue={city}
                                                onChange={handleEditChange}
                                                labelWidth={35}
                                            />
                                        </FormControl>
                                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                            <InputLabel htmlFor="state">State</InputLabel>
                                            <OutlinedInput
                                                required
                                                id="state"
                                                name="state"
                                                type="state"
                                                defaultValue={state}
                                                onChange={handleEditChange}
                                                labelWidth={45}
                                            />
                                        </FormControl>
                                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                            <InputLabel htmlFor="postal_code">Zip Code</InputLabel>
                                            <OutlinedInput
                                                required
                                                id="postal_code"
                                                name="postal_code"
                                                type="number"
                                                defaultValue={postal_code}
                                                onChange={handleEditChange}
                                                labelWidth={70}
                                            />
                                        </FormControl>
                                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                            <InputLabel htmlFor="country">Country</InputLabel>
                                            <OutlinedInput
                                                required
                                                id="country"
                                                name="country"
                                                type="country"
                                                defaultValue={country}
                                                onChange={handleEditChange}
                                                labelWidth={65}
                                            />
                                        </FormControl>
                                        <div className={classes.bottom}>
                                            <Divider />
                                        </div>
                                        <DialogActions>
                                            <Button type='submit' color="primary" autoFocus>
                                                SAVE
                                                </Button>
                                        </DialogActions>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog >
            </div>
        </React.Fragment >
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    textField: {
        width: '97%'
    },
    bottom: {
        marginBottom: 10,
        marginTop: 20
    },
    margin: {
        margin: theme.spacing(1),
    },
    display: {
        display: 'flex',
        flexDirection: 'column'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    }
}));