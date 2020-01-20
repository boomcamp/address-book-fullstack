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
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import Tooltip from '@material-ui/core/Tooltip';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import { deepPurple } from '@material-ui/core/colors';
import clsx from 'clsx';

import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Delete from './Dialogs/Delete';
import Edit from './Dialogs/Edit';
import AddContact from './Dialogs/AddContact';

export default function Contact({ handleClose, handleClickOpen, menuOpen, menuClose, open, anchorEl }) {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openEdit, setOpenEdit] = React.useState(false);
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const [openDelete, setOpenDelete] = React.useState(false);

    // fetch user_id from token
    const token = jwt_decode(localStorage.getItem('token'));
    const id = token.user_id

    useEffect(() => {
        if (localStorage.getItem('token')) {
            axios({
                method: 'get',
                url: `http://localhost:3001/api/contacts/${id}/contacts`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    setUsers(res.data);
                })
                .catch(e => console.log(e))
        } else {
            window.location.href = "/"
        }
    }, [id]);

    const editOpen = () => {
        setOpenEdit(true);
    };

    const editClose = () => {
        setOpenEdit(false);
    };

    const deleteOpen = () => {
        setOpenDelete(true);
    }

    const deleteClose = () => {
        setOpenDelete(false);
    }

    const sortFname = () => {
        axios({
            method: 'get',
            url: `/api/contacts/${id}/contact/a-z`,
        })
            .then(res => {
                setUsers(res.data);
            })
            .catch(e => console.log(e))
    }

    const sortLname = () => {
        axios({
            method: 'get',
            url: `/api/contacts/${id}/contact/z-a`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setUsers(res.data);
            })
            .catch(e => console.log(e))
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Container maxWidth="lg">
                    <Grid className={classes.header}>
                        <Tooltip title="Add Contact" placement="left">
                            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.contact}>
                                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                    ADD CONTACT
                            </Button>
                                <AddContact
                                    fullScreen={fullScreen}
                                    open={open}
                                    handleClose={handleClose}
                                />
                            </Grid>
                        </Tooltip>

                        <Tooltip title="Sort Names" placement="right">
                            <Grid item xs={12} sm={6} md={12} lg={12} className={classes.sort}>
                                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={menuOpen} variant="outlined">
                                    Sort
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={menuClose}
                                >
                                    <MenuItem onClick={sortFname}>Sort: First Name(A-Z)</MenuItem>
                                    <MenuItem onClick={sortLname}>Sort: Last Name(A-Z)</MenuItem>
                                </Menu>
                            </Grid>
                        </Tooltip>
                    </Grid>

                    <div className={classes.height}>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                            style={{ marginTop: 20 }}
                        >
                            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.cards}>
                                {users.map(i => (
                                    <Card key={i.contact_id} elevation={5}>
                                        <CardActionArea>
                                            <CardContent>
                                                <div className={classes.media}>
                                                    <div className={classes.name}>
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {i.fname} {i.lname}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            Mobile No: {i.mobile_phone}
                                                        </Typography>
                                                    </div>
                                                    <div className={classes.avatar}>
                                                        <Avatar className={clsx(classes.purple, classes.large)}>{i.fname[0]}</Avatar>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions className={classes.action}>
                                            <Tooltip title="Edit Contact">
                                                <IconButton aria-label="edit" onClick={editOpen}>
                                                    <EditTwoToneIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Edit
                                                openEdit={openEdit}
                                                editClose={editClose}
                                                Transition={Transition}
                                            />


                                            <Tooltip title="Delete Contact">
                                                <IconButton aria-label="delete" onClick={deleteOpen}>
                                                    <DeleteTwoToneIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Delete
                                                id={i.contact_id}
                                                openDelete={openDelete}
                                                deleteClose={deleteClose}
                                            />
                                        </CardActions>
                                    </Card>
                                ))}
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
        </React.Fragment >
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 20,
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    header: {
        display: 'flex'
    },
    contact: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    sort: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    height: {
        height: 'auto'
    },
    media: {
        display: 'flex'
    },
    name: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    avatar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '50%'
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    action: {
        padding: 0
    },
    cards: {
        display: 'flex',
        flexFlow: 'row' || 'flex-wrap',
    }
}));