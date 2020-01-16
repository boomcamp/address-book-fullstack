import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Account from './Account';

export default function Profile({ handleClickOpen, handleClose, open }) {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
    })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios({
                method: 'get',
                url: `http://localhost:3001/api/contacts`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    setUsers(res.data)
                })
                .catch(e => console.log(e))
        } else {
            window.location.href = "/"
        }
    }, []);

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
                window.location.href = "#/addressbook"
            })
            .catch(e => console.log(e))
    }


    return (
        <React.Fragment>
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                        ADD CONTACT
                    </Button>
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{"Contact"}</DialogTitle>
                        <DialogContent>
                            <Account
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose} color="secondary">
                                CANCEL
                            </Button>
                            <Button onClick={handleSubmit} color="primary" autoFocus>
                                SUBMIT
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Grid container spacing={3} direction='row' justify="center" alignItems="center">
                        {users.map(i => (
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <Card key={i.contact_id} elevation={3}>
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {i.fname} {i.lname}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {i.home_phone}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <IconButton aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div >
        </React.Fragment >
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 20
    }
}));