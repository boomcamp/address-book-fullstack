import React, {useState} from 'react';
import { 
    makeStyles, 
    CssBaseline,
    Container,
    Button,
    DialogTitle,
    Dialog,
    Grid
} from '@material-ui/core';
import {
    ValidatorForm, 
    TextValidator 
} from 'react-material-ui-form-validator';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
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
export default function AddAddress(props){
    const classes = useStyles();
    const {open, setOpen} = props
    const [values, setValues] = useState({
        country: '',
        region: '',
        province: '',
        city: '',
    });
    const [details, setDetails] = useState({
        fname: '', 
        lname: '', 
        email:'', 
        id:'',
    });

    const eventhandler = (e) =>{
        let prevdata = Object.assign({}, values)
        prevdata[e.target.name] = e.target.value;
        setValues(prevdata)
    }
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
    const closeAdd = () => {
        setOpen(false);
    };
    return(
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
    )
}