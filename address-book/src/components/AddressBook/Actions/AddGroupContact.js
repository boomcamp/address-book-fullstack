import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
// import CloseIcon from '@material-ui/icons/Close';
import {List, ListItem, ListItemText} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme =>({
    close: {
        margin: 'auto 35%',
        float: 'right',
        marginBottom: '15%'
    }
}));
export default function AddGroupContact(props){
    const classes = useStyles();
    const {setModal, modal, data, id} = props

    const addMember = (e) =>{
        axios
        .post('http://localhost:5001/api/member', {
            userid: localStorage.getItem('id'),
            groupid: id.g_id,
            contactid: e,
        })
        .then(res=>{
            alert('Successfully Added to Group')
            window.location.reload(true)
        })
        .catch(err=>console.log(err))
    }

    const closeModal = () => {
        // console.log(id)
        setModal(false)
    }
    return(
        <Dialog aria-labelledby="simple-dialog-title" open={modal}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                {data.map((x)=>{
                    return (
                        <List key={x.id}>
                            <Button onClick={() => addMember(x.id)}>
                                <ListItem>
                                    <AccountCircleIcon/>
                                    <ListItemText secondary={x.mobile_phone}>{x.fname} {x.lname}</ListItemText>
                                </ListItem>
                            </Button>
                        </List>
                    )
                })}
                <Button variant="contained" color="primary" onClick={closeModal} className={classes.close}>
                    Close
                </Button>
            </Container>
        </Dialog>
    )
}