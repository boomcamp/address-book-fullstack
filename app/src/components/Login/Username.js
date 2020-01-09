import React from 'react'
import { makeStyles, CardActions } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { Card, CardContent, Button, TextField, Tooltip } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

    const cont = e => {
        e.preventDefault();
        nextStep();
    }

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
                        <TextField
                            required
                            id="email"
                            className={classes.textField}
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            name="email"
                            type="email"
                            onChange={e => handleChange(e)}
                        />
                    </CardContent>
                    <div className={classes.link}>
                        <Tooltip title="You don't have permission to do this">
                            <span>
                                <Button disabled size="small" color="primary" >
                                    Forgot Email?
                            </Button>
                            </span>
                        </Tooltip>
                    </div>
                    <CardContent className={classes.link2} >
                        <CardActions>
                            <Link to="/register">
                                <Button
                                    size="small"
                                    color="primary"
                                >
                                    Create an account
                            </Button>
                            </Link>
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
        </div>
    )
}