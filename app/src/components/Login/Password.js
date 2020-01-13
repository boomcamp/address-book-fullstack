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

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none"
    },
    card: {
        width: 450,
        height: 500,
    },
    textField: {
        width: 370,
    },
    cardcontent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        alignContent: "center",
        margin: "auto",
        marginTop: "20%"
    },
    link2: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        marginLeft: 10,
        marginTop: "22%"
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
    },
    bar: {
        background: "transparent",
        color: "#000"
    },
}));

export default function LoginPage({ handleLogin, prevStep }) {
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
        <div className={classes.root} >
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
        </div >
    )

}