import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme =>({
    titleHeader:{
        width: '100%',
        display: 'flex'
    },
    title: {
        paddingTop: '20px',
        width: '100%'
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
export default function AddGroup(props){
    const classes = useStyles();
    const { setModal, modal, data } = props;
    const [state, setState] = useState({
        group_name: ''
    })

    var onAdd = e => {
        if(data){
            axios
            .post('http://localhost:5001/api/group', {
                userid: localStorage.getItem('id'),
                group_name: state.group_name
            }).then(res => {
                alert('Added New Group')
                window.location.reload(true)
            }).catch(err=>{
                console.error(err)
            })
        }else{
            alert("Please Fill up the whole form")
            window.location.reload(true)
        }
    }

    const eventhandler = (e) =>{
        const { name, value } = e.target
        setState({ ...state, [name]: value})
    }
    const closeModal = () => {
        setModal(false)
    }
    return(
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
                    onSubmit={onAdd}
                    onError={errors => console.log(errors)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextValidator
                                autoComplete="group_name"
                                name="group_name"
                                variant="outlined"
                                fullWidth
                                label="Group Name"
                                autoFocus
                                validators={['required']}
                                errorMessages={['This field is required']}
                                onChange={eventhandler}
                                value={state.group_name}
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
                    >   Create
                    </Button>
                </ValidatorForm>
            </Container>
        </Dialog>
    )
}