import React from 'react';
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

export default function Account({ handleClose }) {
    const classes = useStyles();
    const [data, setData] = React.useState({
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

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
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
            .catch(e => console.log(e))
    }

    return (
        <div className={classes.root}>
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                labelWidth={65}
                            />
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