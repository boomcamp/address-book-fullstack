import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Account({ handleClose }) {
    const classes = useStyles();
    const [data, setData] = useState({
        fname: '',
        lname: '',
        home_phone: 0,
        mobile_phone: 0,
        work_phone: 0,
        city: '',
        state: '',
        postal_code: 0,
        country: '',
        user_id: 0
    });

    const [warn, setWarn] = useState({
        fname: false,
        lname: false,
        home_phone: false,
        mobile_phone: false,
        work_phone: false,
        city: false,
        state: false,
        postal_code: false,
        country: false
    });

    const [help, setHelp] = useState({
        fname: '',
        lname: '',
        home_phone: '',
        mobile_phone: '',
        work_phone: '',
        city: '',
        state: '',
        postal_code: '',
        country: ''
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });

        if (e.target.value.length > 0) {
            setWarn({
                ...warn,
                [e.target.name]: ""
            });
            setHelp({
                ...help,
                [e.target.name]: ""
            });
        } else {
            setWarn({
                ...warn,
                [e.target.name]: true
            });
            setHelp({
                ...help,
                [e.target.name]: `${e.target.name.charAt(0).toUpperCase() +
                    e.target.name.slice(1)} field is required`
            });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const id = decoded.user_id

        axios({
            method: "post",
            url: `http://localhost:3001/api/contacts/${id}`,
            data: data
        })
            .then(e => {
                window.location.reload();
            })
            .catch(e => {
                toast.error("Email and/or Username already Exist!", {
                    position: "top-right",
                    hideProgressBar: true,
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
    }

    const warningUpdate = e => {
        if (e.target.value.length === 0) {
            setWarn({
                ...warn,
                [e.target.name]: true
            });
            setHelp({
                ...help,
                [e.target.name]: `${e.target.name.charAt(0).toUpperCase() +
                    e.target.name.slice(1)} field is required`
            });
        } else if (e.target.value.length === 1) {
            setWarn({
                ...warn,
                [e.target.name]: true
            });
            setHelp({
                ...help,
                [e.target.name]: `${e.target.name.charAt(0).toUpperCase() +
                    e.target.name.slice(1)} must be 2 characters and above`
            })
        } else {
            setHelp({
                ...help,
                [e.target.name]: ""
            });
        }
    };

    return (
        <div className={classes.root}>
            <ToastContainer enableMultiContainer />
            <form className={classes.input} autoComplete="off" onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="fname">First Name</InputLabel>
                            <OutlinedInput
                                required
                                id="fname"
                                name="fname"
                                type="fname"
                                error={warn.fname}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                labelWidth={85}
                            />
                            <FormHelperText id="fname">{help.fname}</FormHelperText>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="lname">Last Name</InputLabel>
                            <OutlinedInput
                                required
                                id="lname"
                                name="lname"
                                type="lname"
                                error={warn.lname}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                labelWidth={85}
                            />
                            <FormHelperText id="lname">{help.lname}</FormHelperText>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="home_phone">Home Number</InputLabel>
                            <OutlinedInput
                                required
                                id="home_phone"
                                name="home_phone"
                                type="number"
                                error={warn.home_phone}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                labelWidth={115}
                            />
                            <FormHelperText id="home_phone">{help.home_phone}</FormHelperText>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="mobile_phone">Mobile Number</InputLabel>
                            <OutlinedInput
                                required
                                id="mobile_phone"
                                name="mobile_phone"
                                type="number"
                                error={warn.mobile_phone}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                labelWidth={115}
                            />
                            <FormHelperText id="mobile_phone">{help.mobile_phone}</FormHelperText>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="work_phone">Work Number</InputLabel>
                            <OutlinedInput
                                required
                                id="work_phone"
                                name="work_phone"
                                type="number"
                                error={warn.work_phone}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                labelWidth={105}
                            />
                            <FormHelperText id="work_phone">{help.work_phone}</FormHelperText>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="city">City</InputLabel>
                            <OutlinedInput
                                required
                                id="city"
                                name="city"
                                type="city"
                                error={warn.city}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                labelWidth={35}
                            />
                            <FormHelperText id="city">{help.city}</FormHelperText>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="state">State</InputLabel>
                            <OutlinedInput
                                required
                                id="state"
                                name="state"
                                type="state"
                                error={warn.state}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                labelWidth={45}
                            />
                            <FormHelperText id="state">{help.state}</FormHelperText>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="postal_code">Zip Code</InputLabel>
                            <OutlinedInput
                                required
                                id="postal_code"
                                name="postal_code"
                                type="number"
                                error={warn.postal_code}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                labelWidth={70}
                            />
                            <FormHelperText id="postal_code">{help.postal_code}</FormHelperText>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="country">Country</InputLabel>
                            <OutlinedInput
                                required
                                id="country"
                                name="country"
                                type="country"
                                error={warn.country}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                labelWidth={65}
                            />
                            <FormHelperText id="country">{help.country}</FormHelperText>
                        </FormControl>
                        <div className={classes.bottom}>
                            <Divider />
                        </div>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleClose}
                            >
                                CANCEL
                        </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                ADD
                        </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    margin: {
        margin: theme.spacing(1),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    bottom: {
        marginBottom: 10,
        marginTop: 20
    },
    textField: {
        width: '97%'
    }
}));