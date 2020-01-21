import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import HouseIcon from '@material-ui/icons/House';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    container: {
        color: 'rgba(0, 0, 0, 0.87)',
        backgroundColor: '#fff',
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        height: '50%',
        borderRadius: '1%',
        width: '95%',
    },
    titleHeader:{
        backgroundColor: 'rgba(0,0,0,0.05)',
        width: '100%',
    },
    title: {
        paddingTop: '20px',
        margin: '10px',
    },
    avatar: {
        backgroundColor: 'blue',
        color: 'blue',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    close: {
        float: 'right'
    }
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
    const [values, setValues] = useState({
        country: '',
        region: '',
        province: '',
        city: '',
    });
    const [values1, setValues1] = useState({
        country: '',
        region: '',
        province: '',
        city: '',
    });
    const [address, setAddress] = useState({
        country: '', 
        region: '', 
        province: '', 
        city: '',
        empty: true,
    });

    const addAddress = () => {
        axios
        .post('http://localhost:5001/api/address', {
            "userid": localStorage.getItem('id'),
            "country": values.country,
            "region": values.region,
            "province": values.province,
            "city": values.city,
        }).then(res=>{
            alert('Address Added')
            setDetails({ ...details, empty: false});
            window.location.reload(true)
        }).catch(err=>{
            console.error(err)
        })
    }
    const eventhandler = (e) =>{
        let prevdata = Object.assign({}, values)
        prevdata[e.target.name] = e.target.value;
        setValues(prevdata)
    }
    const updateAddress = () => {
        axios
        .patch(`http://localhost:5001/api/address/${localStorage.getItem('id')}`, {
            "userid": localStorage.getItem('id'),
            "country": values1.country,
            "region": values1.region,
            "province": values1.province,
            "city": values1.city,
        }).then(res=>{
            alert('Address Updated')
            window.location.reload(true)
        }).catch(err=>{
            console.error(err)
        })
    }
    const eventhandler1 = (e) =>{
        let prevdata = Object.assign({}, values1)
        prevdata[e.target.name] = e.target.value;
        setValues1(prevdata)
    }

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
    
    const openAdd = () => {
        setOpen(true);
    };

    const closeAdd = () => {
        setOpen(false);
    };
    
    const openAdd1 = () => {
        setOpen1(true);
    };

    const closeAdd1 = () => {
        setOpen1(false);
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
                        {/* {console.log(address.empty)} */}
                        {(address.empty) ? ( // empty === true, means maga add na muna ng address
                            <ListItem>
                                <ListItemIcon>
                                    <Button variant="outlined" color="primary" onClick={openAdd}>
                                        Add Address
                                    </Button>
                                </ListItemIcon>
                            </ListItem>
                            ) : ( // empty === false, means maga update na ng address since hindi na empty ang address table
                            <ListItem>
                                <ListItemIcon>
                                    <Avatar>
                                        <HouseIcon />
                                    </Avatar>
                                </ListItemIcon>
                                {/* contentEditable="true" */}
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
                        <Dialog aria-labelledby="simple-dialog-title" open={open}>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <DialogTitle id="simple-dialog-title">
                                    Address Details
                                    <Button color="primary" onClick={closeAdd} className={classes.close}>
                                        <CloseIcon/>
                                    </Button>
                                </DialogTitle>
                                    <ValidatorForm
                                        className={classes.form}
                                        onSubmit={addAddress}
                                        onError={errors => console.log(errors)}
                                    >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextValidator
                                                autoComplete="country"
                                                name="country"
                                                variant="outlined"
                                                fullWidth
                                                label="Country"
                                                autoFocus
                                                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                                errorMessages={['This field is required', 'Must contain letters only.']}
                                                onChange={eventhandler}
                                                value={values.country}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextValidator
                                                autoComplete="region"
                                                name="region"
                                                variant="outlined"
                                                fullWidth
                                                label="Region"
                                                autoFocus
                                                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                                errorMessages={['This field is required', 'Must contain letters only.']}
                                                onChange={eventhandler}
                                                value={values.region}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextValidator
                                                autoComplete="province"
                                                name="province"
                                                variant="outlined"
                                                fullWidth
                                                label="Province"
                                                autoFocus
                                                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                                errorMessages={['This field is required', 'Must contain letters only.']}
                                                onChange={eventhandler}
                                                value={values.province}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextValidator
                                                autoComplete="city"
                                                name="city"
                                                variant="outlined"
                                                fullWidth
                                                label="City"
                                                autoFocus
                                                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                                errorMessages={['This field is required', 'Must contain letters only.']}
                                                onChange={eventhandler}
                                                value={values.city}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >   Add
                                    </Button>
                                </ValidatorForm>
                            </Container>
                        </Dialog>
                        ) : (
                        <Dialog aria-labelledby="simple-dialog-title" open={open1}>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline />
                                <DialogTitle id="simple-dialog-title">
                                    Address Details
                                    <Button color="primary" onClick={closeAdd1} className={classes.close}>
                                        <CloseIcon/>
                                    </Button>
                                </DialogTitle>
                                    <ValidatorForm
                                        className={classes.form}
                                        onSubmit={updateAddress}
                                        onError={errors => console.log(errors)}
                                    >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextValidator
                                                autoComplete="country"
                                                name="country"
                                                variant="outlined"
                                                fullWidth
                                                label="Country"
                                                autoFocus
                                                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                                errorMessages={['This field is required', 'Must contain letters only.']}
                                                onChange={eventhandler1}
                                                value={values1.country}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextValidator
                                                autoComplete="region"
                                                name="region"
                                                variant="outlined"
                                                fullWidth
                                                label="Region"
                                                autoFocus
                                                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                                errorMessages={['This field is required', 'Must contain letters only.']}
                                                onChange={eventhandler1}
                                                value={values1.region}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextValidator
                                                autoComplete="province"
                                                name="province"
                                                variant="outlined"
                                                fullWidth
                                                label="Province"
                                                autoFocus
                                                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                                errorMessages={['This field is required', 'Must contain letters only.']}
                                                onChange={eventhandler1}
                                                value={values1.province}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextValidator
                                                autoComplete="city"
                                                name="city"
                                                variant="outlined"
                                                fullWidth
                                                label="City"
                                                autoFocus
                                                validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                                errorMessages={['This field is required', 'Must contain letters only.']}
                                                onChange={eventhandler1}
                                                value={values1.city}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >   Update
                                    </Button>
                                </ValidatorForm>
                            </Container>
                        </Dialog>
                        )}
                    </List>
                </div>
            </Container>
        </React.Fragment>
    )
}