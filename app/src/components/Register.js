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
// import FormHelperText from '@material-ui/core/FormHelperText';

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
        axios({
            method: "post",
            url: 'http://localhost:3001/api/register',
            data: state
        })
            .then(e => {
                localStorage.setItem('token', e.data.token);
                localStorage.setItem('id', e.data.user_id);
                localStorage.setItem('user', e.data.username);
                window.location.href = "#/";
            })
            .catch(e => console.log(e))
    };

    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    // const passValidation = e => {
    //     const { password } = state.data
    //     if (confirm.length > 1 || password.length > 1) {
    //         setValidate(true)
    //     }
    // };

    // const onChangeConfirm = e => {
    //     setConfirm(e.target.value);
    // };

    return (
        <React.Fragment>
            <div className={classes.root}>
                <div item className={classes.content} >
                    <form className={classes.input} autoComplete="off" onSubmit={handleSubmit}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                                required
                                id="email"
                                name="email"
                                type="email"
                                onChange={handleChange}
                                defaultValue={state.email}
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
                                defaultValue={state.username}
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
                                // color={validate ? 'primary' : 'secondary'}
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
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="firstname">First Name</InputLabel>
                            <OutlinedInput
                                id="firstname"
                                name="firstname"
                                type="firstname"
                                autoFocus
                                onChange={handleChange}
                                defaultValue={state.firstname}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <PermIdentityIcon />
                                    </InputAdornment>
                                }
                                labelWidth={85}
                            />
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="lastname">Last Name</InputLabel>
                            <OutlinedInput
                                id="lastname"
                                name="lastname"
                                type="lastname"
                                onChange={handleChange}
                                defaultValue={state.lastname}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <PermIdentityIcon />
                                    </InputAdornment>
                                }
                                labelWidth={80}
                            />
                        </FormControl>
                        {/* <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
                                <OutlinedInput
                                    required
                                    color={validate ? 'primary' : 'secondary'}
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    type={values.showPassword ? 'text' : 'confirmpassword'}
                                    onChange={e => {
                                        passValidation(e);
                                        onChangeConfirm(e);
                                    }}
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
                                    labelWidth={140}
                                />
                                <FormHelperText id="confirmpassword">{validate ? null : "Password does not match"}</FormHelperText>
                            </FormControl> */}
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
        </React.Fragment>
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