import React from 'react';
import axios from 'axios';

// Form
import { makeStyles } from '@material-ui/core/styles';
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
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register({ handleClose }) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false
    });
    const [state, setState] = React.useState({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: ''
    });

    const [warn, setWarn] = React.useState({
        email: false,
        username: false,
        password: false,
        firstname: false,
        lastname: false
    });

    const [help, setHelp] = React.useState({
        firstname: "",
        lastname: "",
        username: "",
        password: ""
    });
    // const [confirm, setConfirm] = React.useState('');
    // const [validate, setValidate] = React.useState(null);

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (
            state.email === "" ||
            state.username === "" ||
            state.password === "" ||
            state.firstname === "" ||
            state.lastname === ""
        ) {
            toast.error("Fill-up all fields!", {
                position: 'top-right',
                hideProgressBar: true,
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        } else {
            axios({
                method: "post",
                url: "http://localhost:3001/api/register",
                data: state
            })
                .then(e => {
                    localStorage.setItem("token", e.data.token)
                })
                .then(() => {
                    toast.success("Registered Successfully", {
                        position: "top-right",
                        hideProgressBar: true,
                        autoClose: 3000,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    })
                })
                .then(() => {
                    window.location.href = "#/addressbook"
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
                });
        }
    };

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
        if (e.target.value.length > 0) {
            setWarn({
                ...warn,
                [e.target.name]: false
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
    };

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
        <React.Fragment>
            <div className={classes.root}>
                <div className={classes.content} >
                    <ToastContainer enableMulticontainer />
                    <form className={classes.input} autoComplete="off" onSubmit={handleSubmit}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                                required
                                id="email"
                                name="email"
                                type="email"
                                error={warn.email}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                defaultValue={state.email}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <AlternateEmailIcon />
                                    </InputAdornment>
                                }
                                labelWidth={50}
                            />
                            <FormHelperText id="email">{help.email}</FormHelperText>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <OutlinedInput
                                required
                                id="username"
                                name="username"
                                type="username"
                                error={warn.username}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                defaultValue={state.username}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <AccountBoxIcon />
                                    </InputAdornment>
                                }
                                labelWidth={80}
                            />
                            <FormHelperText id="username">{help.username}</FormHelperText>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                required
                                id="password"
                                name="password"
                                error={warn.password}
                                onBlur={warningUpdate}
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
                            <FormHelperText id="password">{help.password}</FormHelperText>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <OutlinedInput
                                required
                                id="firstname"
                                name="firstname"
                                type="firstname"
                                error={warn.firstname}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                defaultValue={state.firstname}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <PermIdentityIcon />
                                    </InputAdornment>
                                }
                                labelWidth={85}
                            />
                            <FormHelperText id="firstname">{help.firstname}</FormHelperText>
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <OutlinedInput
                                required
                                id="lastname"
                                name="lastname"
                                type="lastname"
                                error={warn.lastname}
                                onBlur={warningUpdate}
                                onChange={handleChange}
                                defaultValue={state.lastname}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <PermIdentityIcon />
                                    </InputAdornment>
                                }
                                labelWidth={80}
                            />
                            <FormHelperText id="lastname">{help.lastname}</FormHelperText>
                        </FormControl>
                        <div className={classes.bottom}>
                            <Divider />
                        </div>
                        <div className={classes.buttons}>
                            <div className={classes.cancel}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleClose}
                                >
                                    Cancel
                                    </Button>
                            </div>
                            <div className={classes.register}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Register
                                    </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </React.Fragment >
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
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
        marginBottom: 10,
        marginTop: 20
    },
    cancel: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    register: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));