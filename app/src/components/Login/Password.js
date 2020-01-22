import React from 'react'
import { makeStyles, InputAdornment } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import { Card, CardContent, Button, Tooltip } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function LoginPage({ handleLogin, prevStep, handleChange, warn, help, warningUpdate, ToastContainer }) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    return (
        <Grid container className={classes.root}>
            <ToastContainer enableMulticontainer />
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                <PermIdentityIcon />
                            </Avatar>
                        }
                        title="Sign In"
                    />
                    <form onSubmit={handleLogin}>
                        <CardContent className={classes.cardcontent}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    required
                                    id="password"
                                    name="password"
                                    error={warn.password}
                                    onBlur={warningUpdate}
                                    onChange={handleChange}
                                    type={values.showPassword ? 'text' : 'password'}
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
                                    labelWidth={70}
                                />
                                <FormHelperText id="password">{help}</FormHelperText>
                            </FormControl>
                        </CardContent>
                        <CardContent className={classes.link2}>
                            <Tooltip title="Beta">
                                <span>
                                    <Button disabled size="small" color="primary" className={classes.forgot}>
                                        Forgot Password?
                                    </Button>
                                </span>
                            </Tooltip>
                            <div className={classes.button}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.back}
                                    onClick={prevStep}>
                                    Back
                                </Button>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.ok}
                                type="submit"
                            >
                                OK
                            </Button>
                        </CardContent>
                    </form>
                </Card>
            </Grid>
        </Grid>
    )

}

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexGrow: 1,
    },
    link: {
        textDecoration: "none"
    },
    card: {
        height: 500,
    },
    textField: {
        width: '90%',
    },
    cardcontent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: "20%"
    },
    link2: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginLeft: 10,
        marginTop: "25%"
    },
    back: {
        marginRight: -10
    },
    ok: {
        marginRight: -10
    },
    forgot: {
        marginLeft: -33
    },
    button: {
        marginRight: -50
    }
}));