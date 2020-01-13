import React from 'react'
import { makeStyles, CardActions } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Card, CardContent, Button, Tooltip } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import Register from '../Register';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    title: {
        flexGrow: 1
    },
    link: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginLeft: 35,
        marginTop: -20
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
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginLeft: 10,
        marginTop: "20%"
    },
    next: {
        marginRight: 25
    },
    bar: {
        background: "transparent",
        color: "#000"
    },
}));

export default function LoginPage({ nextStep, handleChange }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const cont = e => {
        e.preventDefault();
        nextStep();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            <PermIdentityIcon />
                        </Avatar>
                    }
                    title="Sign In"
                />
                <form onSubmit={cont}>
                    <CardContent className={classes.cardcontent}>
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
                                labelWidth={70}
                            />
                        </FormControl>
                    </CardContent>
                    <div className={classes.link}>
                        <Tooltip title="Beta">
                            <span>
                                <Button disabled size="small" color="primary" >
                                    Forgot Email?
                            </Button>
                            </span>
                        </Tooltip>
                    </div>
                    <CardContent className={classes.link2} >
                        <CardActions>
                            <Button
                                size="small"
                                color="primary"
                                onClick={handleClickOpen}>
                                Create an account
                            </Button>
                            <Dialog
                                fullWidth
                                maxWidth='sm'
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="register"
                            >
                                <DialogTitle id="register">Register</DialogTitle>
                                <Divider />
                                <DialogContent>
                                    <Register handleClose={handleClose} />
                                </DialogContent>
                            </Dialog>
                        </CardActions>
                        <Button
                            className={classes.next}
                            variant="contained"
                            color="primary"
                            type="submit">
                            Next
                    </Button>
                    </CardContent>
                </form>
            </Card>
        </div >
    )
}