import React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme =>({
    table: {
        width: '40%',
        margin: 'auto',
        marginTop: '5%',
    },
    titleHeader:{
        // backgroundColor: 'rgba(0,0,0,0.05)',
        width: '100%',
        display: 'flex'
    },
    title: {
        paddingTop: '20px',
        width: '100%'
        // marginRight: '50px',
        // float: 'right',
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
    close: {
        margin: '20px',
    }
}));
export default function EditContacts(props) {
    const classes = useStyles();
    const { modal, setData, data, setModal } = props;
    
    var onUpdate = e =>{
        axios
        .patch(`http://localhost:5001/api/contact/${data.id}`,{
            "f_name": data.f_name, 
            "l_name": data.l_name, 
            "home_phone": data.home_phone, 
            "mobile_phone": data.mobile_phone, 
            "work_phone": data.work_phone, 
            "email": data.email, 
            "city": data.city, 
            "state_or_province": data.state_or_province, 
            "postal_code": data.postal_code,
            "country": data.country
        },{ headers: 
            {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res=>{
            alert('Successfully Updated')
            window.location.reload(true)
        })
        .catch(err=>{
            console.error(err)
        })
    }
    const eventhandler = (e) =>{
        const { name, value } = e.target
        setData({ ...data, [name]: value})
    }
    const closeModal = () => {
        setModal(false)
    }

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={modal}>
            <Container component="main" maxWidth="sm">
                <div className={classes.titleHeader}>
                    <Typography variant="h6" className={classes.title}>
                        Contact Details
                    </Typography>
                    <Button color="primary" onClick={closeModal} className={classes.close}>
                        <CloseIcon/>
                    </Button>
                </div>
                <CssBaseline />
                <ValidatorForm
                    className={classes.form}
                    onSubmit={onUpdate}
                    onError={errors => console.log(errors)}
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
                                value={data.f_name}
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
                                value={data.l_name}
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
                                value={data.email}
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
                                value={data.mobile_phone}
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
                                value={data.home_phone}
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
                                value={data.work_phone}
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
                                value={data.city}
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
                                value={data.state_or_province}
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
                                value={data.postal_code}
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
                                value={data.country}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        sm={6}
                    >   Update
                    </Button>
                </ValidatorForm>
            </Container>
        </Dialog>
    )
}