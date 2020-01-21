import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
// import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme =>({
    box: {
        // margin: theme.spacing(1),
        textAlign: 'center', width: '20%', height: '10%', margin: 'auto'
    },
    // details: {
    //     minWidth: '100%',
    // }
}));
export default function ViewGroupContacts(props) {
    const classes = useStyles();
    const {rowData} = props;
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [detailsId, setDetailsId] = useState()
    const [id, setId] = useState([])
    const [member, setMember] = useState([])
    const [contactId, setContactId] = useState()

    useEffect(()=>{
        axios
        .get(`http://localhost:5001/api/contact/${localStorage.getItem('id')}`)
        .then(res=>{
            var temp =[]
            res.data.map(x=>{
                temp.push({
                    id: x.id,
                    fname: x.f_name,
                    lname: x.l_name,
                    mphone: x.mobile_phone,
                    hphone: x.home_phone,
                    wphone: x.work_phone,
                    email: x.email,
                    city: x.city,
                    s_p: x.state_or_province,
                    p_code: x.postal_code,
                    country: x.country
                })
                return temp      
            })
            setMember(temp)
        })

        axios
        .get(`http://localhost:5001/api/members/${localStorage.getItem('id')}/${rowData.id}`)
        .then(res=>{
            var reserve = []
            res.data.map(x=>{
                reserve.push({id:x.contactid})
                return reserve
            })
            setId(reserve)
        })
    },[rowData.id])
    const removeContact = () => {
        axios
        .delete(`http://localhost:5001/api/members/${localStorage.getItem('id')}/${contactId}`)
        .then(res=>{
            window.location.reload(true)
        })
        .catch(err=>console.log(err))
    }
    const handleClickOpen = (e) => {
        setContactId(e)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const openDetails = (e) => {
        setDetailsId(e)
        setOpen1(true)
    }
    const closeDetails = () => {
        setOpen1(false)
    }
    return(
        <React.Fragment>
            <div>
                {member.map((x,i)=>{
                    return id.map(y=>{
                        if (x.id === y.id){
                            return (
                                <List key={i}>
                                    <ListItem>
                                        <Box
                                            boxShadow={3}
                                            m={1}
                                            p={1}
                                            className={classes.box}
                                        >
                                            <AccountCircleIcon/>
                                            <ListItemText secondary={`+63${x.mphone}`}>{x.fname} {x.lname}</ListItemText>
                                            <Button color="primary" onClick={() => handleClickOpen(x.id)}>
                                                <RemoveCircleOutlineIcon/>
                                            </Button>
                                            <Button color="primary" onClick={() => openDetails(x.id)}>
                                                <VisibilityIcon/>
                                            </Button>
                                        </Box>
                                    </ListItem>
                                </List>
                            )
                        }
                    })
                })}
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want te remove this contact from this Group?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={removeContact} color="primary">
                            Yes
                        </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={open1}
                    onClose={closeDetails}
                    className={classes.details}
                >   
                    <DialogContent>
                        {member.map(x=>{
                            if(x.id === detailsId) {
                                return (
                                <List key={x.id} >
                                    <ListItem>
                                        <ListItemText primary='Name:' secondary={`${x.fname} ${x.lname}`}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Mobile Phone:' secondary={`+63${x.mphone}`}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Work Phone:' secondary={`${x.wphone}`}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Home Phone:' secondary={`${x.hphone}`}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Email:' secondary={`${x.email}`}/>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Address:' secondary={`${x.city} City, ${x.s_p}, ${x.country}, ${x.p_code}`}/>
                                    </ListItem>
                                </List>)
                            }
                        })}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDetails} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </React.Fragment>
    )
}