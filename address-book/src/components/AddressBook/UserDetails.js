import React, { useEffect, useState } from 'react';
import { 
    makeStyles, 
    CssBaseline,
    Typography,
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Button
} from '@material-ui/core';
import axios from 'axios';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import HouseIcon from '@material-ui/icons/House';
import CreateIcon from '@material-ui/icons/Create';
import AddAddress from './Actions/AddAddress';
import EditAddress from './Actions/EditAddress';

const useStyles = makeStyles(theme => ({
    container: {
        color: 'rgba(0, 0, 0, 0.87)',
        backgroundColor: '#fff',
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        height: '50%',
        borderRadius: '1%',
        width: '95%',
        margin: '0px auto',
        marginBottom: '30px'
    },
    titleHeader:{
        backgroundColor: 'rgba(0,0,0,0.05)',
        width: '100%',
    },
    title: {
        paddingTop: '20px',
        margin: '10px',
    },
}))

export default function UserDetails(props){
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [details, setDetails] = useState({
        fname: '', 
        lname: '', 
        email:'', 
        id:'',
    });
    const [address, setAddress] = useState({
        country: '', 
        region: '', 
        province: '', 
        city: '',
        empty: true,
    });    

    useEffect(() =>{
        axios
        .get(`http://localhost:5001/api/user/${localStorage.getItem('id')}`)
        .then(res=>{
            setDetails(e=>{
                return{ ...e, fname:res.data.fname, lname:res.data.lname, email:res.data.email, id:res.data.id };
            })
        })
        
        axios
        .get(`http://localhost:5001/api/address/${localStorage.getItem('id')}`)
        .then(res => {
            if(Object.keys(res.data).length === 0){
                console.log('Database is still Empty')
            }else{
                setAddress(e=>{
                    return{ ...e, country:res.data[0].country, region:res.data[0].region, province:res.data[0].province, city:res.data[0].city, empty: false };
                })
            }
        })
    },[])
    
    const openAdd1 = () => {
        setOpen1(true);
    };
    const openAdd = () => {
        setOpen(true);
    };
    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" className={classes.container}>
                <div className={classes.titleHeader}>
                    <Typography variant="h6" className={classes.title}>
                        Your Details
                    </Typography>
                </div>
                <div className={classes.demo}>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText secondary="Name">
                                {details.fname} {details.lname}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Avatar>
                                    <EmailIcon />
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText secondary="Email">
                                {details.email}
                            </ListItemText>
                        </ListItem>
                        {(address.empty) ? (
                            <ListItem>
                                <ListItemIcon>
                                    <Button variant="outlined" color="primary" onClick={openAdd}>
                                        Add Address
                                    </Button>
                                </ListItemIcon>
                            </ListItem>
                            ) : (
                            <ListItem>
                                <ListItemIcon>
                                    <Avatar>
                                        <HouseIcon />
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText secondary="Address">
                                    {address.city} City, {address.province}, {address.region}, {address.country}
                                </ListItemText>
                                <ListItemIcon>
                                    <Button onClick={openAdd1}>
                                        <Avatar>
                                            <CreateIcon/>
                                        </Avatar>
                                    </Button>
                                </ListItemIcon>
                            </ListItem>
                        )}
                        {(address.empty) ? (
                            <AddAddress
                                open={open}
                                setOpen={setOpen}
                            />
                        ) : (
                            <EditAddress
                                open1={open1}
                                setOpen1={setOpen1}
                            />
                        )}
                    </List>
                </div>
            </Container>
        </React.Fragment>
    )
}