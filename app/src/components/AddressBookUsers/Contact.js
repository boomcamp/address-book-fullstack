import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
// import AddToPhotosTwoToneIcon from '@material-ui/icons/AddToPhotosTwoTone';

import Delete from './Dialogs/Delete';
import Edit from './Dialogs/Edit';
import AddContact from './Dialogs/AddContact';

export default function Contact({ users, handleClose, handleClickOpen, menuOpen, menuClose, open, anchorEl, sortFnameAZ, sortFnameZA, sortLnameAZ, sortLnameZA, searchData }) {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openEdit, setOpenEdit] = React.useState(false);
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    const [openDelete, setOpenDelete] = React.useState(false);

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
                                    <MenuItem onClick={sortFnameAZ}>First Name(A-Z)</MenuItem>
                                    <MenuItem onClick={sortFnameZA}>First Name(Z-A)</MenuItem>
                                    <MenuItem onClick={sortLnameAZ}>Last Name(A-Z)</MenuItem>
                                    <MenuItem onClick={sortLnameZA}>Last Name(Z-A)</MenuItem>
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

                            {searchData ? searchData.map(i => (
                                <Grid item key={i.contact_id} xs={12} sm={6} md={4} lg={3} className={classes.cards}>
                                    <Card key={i.contact_id} elevation={5}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {i.fname} {i.lname}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Mobile No: {i.mobile_phone}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <div className={classes.action}>
                                            <Tooltip title="Edit Contact">
                                                <IconButton aria-label="edit" onClick={editOpen}>
                                                    <EditTwoToneIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Edit
                                                openEdit={openEdit}
                                                editClose={editClose}
                                                Transition={Transition}
                                                fname={i.fname}
                                                lname={i.lname}
                                                home_phone={i.home_phone}
                                                mobile_phone={i.mobile_phone}
                                                work_phone={i.work_phone}
                                                city={i.city}
                                                state={i.state}
                                                postal_code={i.postal_code}
                                                country={i.country}
                                                user_id={i.user_id}
                                                id={i.contact_id}
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
                                        </div>
                                    </Card>
                                </Grid>
                            )) : users.map(i => (
                                <Grid item key={i.contact_id} xs={12} sm={6} md={4} lg={3} className={classes.cards}>
                                    <Card key={i.contact_id} elevation={5}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {i.fname} {i.lname}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Mobile No: {i.mobile_phone}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <div className={classes.action}>
                                            <Tooltip title="Edit Contact">
                                                <IconButton aria-label="edit" onClick={editOpen}>
                                                    <EditTwoToneIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Edit
                                                openEdit={openEdit}
                                                editClose={editClose}
                                                Transition={Transition}
                                                fname={i.fname}
                                                lname={i.lname}
                                                home_phone={i.home_phone}
                                                mobile_phone={i.mobile_phone}
                                                work_phone={i.work_phone}
                                                city={i.city}
                                                state={i.state}
                                                postal_code={i.postal_code}
                                                country={i.country}
                                                user_id={i.user_id}
                                                id={i.contact_id}
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
                                        </div>
                                    </Card>
                                </Grid>
                            ))}

                            {/* {users.map(i => (
                                <Grid item key={i.contact_id} xs={12} sm={6} md={4} lg={3} className={classes.cards}>
                                    <Card key={i.contact_id} elevation={5}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {i.fname} {i.lname}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Mobile No: {i.mobile_phone}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <div className={classes.action}>
                                            <Tooltip title="Edit Contact">
                                                <IconButton aria-label="edit" onClick={editOpen}>
                                                    <EditTwoToneIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Edit
                                                openEdit={openEdit}
                                                editClose={editClose}
                                                Transition={Transition}
                                                fname={i.fname}
                                                lname={i.lname}
                                                home_phone={i.home_phone}
                                                mobile_phone={i.mobile_phone}
                                                work_phone={i.work_phone}
                                                city={i.city}
                                                state={i.state}
                                                postal_code={i.postal_code}
                                                country={i.country}
                                                user_id={i.user_id}
                                                id={i.contact_id}
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
                                        </div>
                                    </Card>
                                </Grid>
                            ))
                            } */}
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
        height: '100%'
    },
    action: {
        display: 'flex'
    }
}));