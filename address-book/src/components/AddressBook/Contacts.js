import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
// import DeleteIcon from '@material-ui/icons/Delete';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import DialogTitle from '@material-ui/core/DialogTitle';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme =>({
    table: {
        width: '40%',
        margin: 'auto',
        marginTop: '5%',
    },
    titleHeader:{
        backgroundColor: 'rgba(0,0,0,0.05)',
        width: '100%',
    },
    title: {
        paddingTop: '20px',
        marginRight: '50px',
        float: 'right',
    },
    actions: {
        display: 'flex',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SimpleTable() {
    const classes = useStyles();
    const [value, setValue] = useState([])
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({
        f_name: '',
        l_name: '',
        home_phone: '',
        work_phone: '',
        mobile_phone: '',
        email: '',
        city: '',
        state_or_province: '',
        postal_code: '',
        country: '',
    })

    useEffect(() => {
        axios
        .get('http://localhost:5001/api/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res=>{
            axios
            .get('http://localhost:5001/api/contacts')
            .then(res => {
                let temp = [];
                res.data.map((x) => {
                    temp.push({
                        id: x.id,
                        fname: x.f_name, 
                        lname: x.l_name, 
                        phone: x.mobile_phone,
                    })
                    return temp;
                })
                setValue(temp)
            })
        })
    },[])

    const editContact = e => {
        console.log(e.target.value)
        axios
        .patch(`http://localhost:5001/api/contact/${e.target.value}`,{
            "f_name": state.f_name, 
            "l_name": state.l_name, 
            "home_phone": state.home_phone, 
            "mobile_phone": state.mobile_phone, 
            "work_phone": state.work_phone, 
            "email": state.email, 
            "city": state.city, 
            "state_or_province": state.state_or_province, 
            "postal_code": state.postal_code,
            "country": state.country
        })
        .catch(err=>{
            console.error(err)
        })
    }
    const eventhandler = (e) =>{
        let prevdata = Object.assign({}, state)
        prevdata[e.target.name] = e.target.value;
        setState(prevdata)
    }
    const handleEdit = () => {
        // value.map((x)=>{
        //     console.log(x.id)
        // })
        // console.log(e)
        setOpen(true)
    }
    const closeEdit = () => {
        setOpen(false)
    }
    return (
        <TableContainer component={Paper} className={classes.table}>
            <div className={classes.titleHeader}>
                <Typography variant="h6" className={classes.title}>
                    Add
                </Typography>
            </div>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Firstname</TableCell>
                    <TableCell>Lastname</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {/* {console.log(value)} */}
                {value.map(row => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">{row.fname}</TableCell>
                        <TableCell>{row.lname}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell className={classes.actions}>
                            <Avatar>
                                <Button onClick={handleEdit}>
                                    <EditIcon/>
                                </Button>
                            </Avatar>
                            <Dialog onClose={closeEdit} aria-labelledby="simple-dialog-title" open={open}>
                                <Container component="main" maxWidth="xs">
                                    <CssBaseline />
                                    <ValidatorForm
                                        className={classes.form}
                                        onSubmit={editContact}
                                        onError={errors => console.log(errors)}
                                        // value={row.id}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextValidator
                                                    autoComplete="f_name"
                                                    name="f_name"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="First Name"
                                                    autoFocus
                                                    validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                                    errorMessages={['This field is required', 'Must contain letters only.']}
                                                    onChange={eventhandler}
                                                    value={state.f_name}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextValidator
                                                    autoComplete="l_name"
                                                    name="l_name"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Last Name"
                                                    autoFocus
                                                    validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                                    errorMessages={['This field is required', 'Must contain letters only.']}
                                                    onChange={eventhandler}
                                                    value={state.l_name}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextValidator
                                                    autoComplete="email"
                                                    name="email"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Email"
                                                    autoFocus
                                                    validators={['required', 'isEmail']}
                                                    errorMessages={['This field is required', 'Email is not Valid']}
                                                    onChange={eventhandler}
                                                    value={state.email}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextValidator
                                                    autoComplete="mobile_phone"
                                                    name="mobile_phone"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Phone Number"
                                                    autoFocus
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">+63</InputAdornment>,
                                                    }}
                                                    validators={['required']}
                                                    errorMessages={['This field is required']}
                                                    onChange={eventhandler}
                                                    value={state.mobile_phone}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextValidator
                                                    autoComplete="home_phone"
                                                    name="home_phone"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Home Phone"
                                                    autoFocus
                                                    validators={['required']}
                                                    errorMessages={['This field is required']}
                                                    onChange={eventhandler}
                                                    value={state.home_phone}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextValidator
                                                    autoComplete="work_phone"
                                                    name="work_phone"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Work Phone"
                                                    autoFocus
                                                    validators={['required']}
                                                    errorMessages={['This field is required']}
                                                    onChange={eventhandler}
                                                    value={state.work_phone}
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
                                                    value={state.city}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextValidator
                                                    autoComplete="state_or_province"
                                                    name="state_or_province"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="State/Province"
                                                    autoFocus
                                                    validators={['required', 'matchRegexp:^[A-Za-z]+$']}
                                                    errorMessages={['This field is required', 'Must contain letters only.']}
                                                    onChange={eventhandler}
                                                    value={state.state_or_province}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextValidator
                                                    autoComplete="postal_code"
                                                    name="postal_code"
                                                    variant="outlined"
                                                    fullWidth
                                                    label="Postal Code"
                                                    autoFocus
                                                    validators={['required']}
                                                    errorMessages={['This field is required']}
                                                    onChange={eventhandler}
                                                    value={state.postal_code}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
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
                                                    value={state.country}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >   Edit
                                        </Button>
                                    </ValidatorForm>
                                </Container>
                            </Dialog>
                            {/* <Avatar onClick={deleteAddress}>
                                <DeleteIcon/>
                            </Avatar> */}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
  );
}