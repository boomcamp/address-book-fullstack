import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

import axios from 'axios';

export default function Register({ handleClose }) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false
    });
    const [data, setData] = React.useState({
        email: '',
        username: '',
        password: '',
        fname: undefined,
        lname: undefined
    })

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            url: `http://localhost:3001/api/register`,
            data: data
        })
            .then(e => {
                window.localtion.href = "#/";
            })
            .catch(e => console.log(e))
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className={classes.root}>

            <div className={classes.content}>
                <form className={classes.input} autoComplete="off" onSubmit={handleSubmit}>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                            required
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <AlternateEmailIcon />
                                </InputAdornment>
                            }
                            labelWidth={50}
                        />
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <OutlinedInput
                            required
                            id="username"
                            name="username"
                            type="username"
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <AccountBoxIcon />
                                </InputAdornment>
                            }
                            labelWidth={80}
                        />
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            required
                            id="password"
                            name="password"
                            type={values.showPassword ? 'text' : 'password'}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={80}
                        />
                    </FormControl>
                    <Divider />
                    <div className={clsx(classes.buttons, classes.margin, classes.bottom)}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </div>
        </div >
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(100),
            height: theme.spacing(45),
        },
    },
    content: {
        padding: 10,
        margin: 10
    },
    textField: {
        width: "95%",
    },
    margin: {
        margin: theme.spacing(2),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    bottom: {
        marginBottom: 20
    }
}));