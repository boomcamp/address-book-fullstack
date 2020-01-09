import React from 'react'
import { makeStyles, InputAdornment } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import { Card, CardContent, Button, TextField, Tooltip } from '@material-ui/core';

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

export default function LoginPage(props) {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
          </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                <form onSubmit={props.handleLogin}>
                    <CardContent className={classes.cardcontent}>
                        <TextField
                            required
                            id="password"
                            className={classes.textField}
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            name="password"
                            type="password"
                            onChange={e => props.handleChange(e)}
                            InputProps={{
                                startAdornment: <InputAdornment position="end"><AlternateEmailIcon /></InputAdornment>
                            }}
                        />
                    </CardContent>
                    <CardContent className={classes.link2}>
                        <Tooltip title="You don't have permission to do this">
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
                                onClick={props.prevStep}>
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