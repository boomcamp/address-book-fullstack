import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 20
    }
}));

export default function Profile() {
    const classes = useStyles();
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios({
                method: 'get',
                url: `http://localhost:3001/api/contacts`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(function (res) {
                    setUsers(res.data)
                })
                .catch(e => console.log(e))
        } else {
            window.location.href = "/"
        }
    }, []);

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Container maxWidth="lg">
                    ADD USER
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