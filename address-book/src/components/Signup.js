import React, { useState, useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'

//MATERIAL UI
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default function Signup() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        cPassword: "",
    })
    const [success, setSuccess] = useState(false);

    const handleSubmit = () => {
        axios.post(`/api/signup`, {
            "username": user.username,
            "password": user.password
        })
        .then(res => {
            console.log(res)
            setSuccess(true)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
            ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
              if (value !== user.password) {
                  return false;
              }
              return true;
            });

            ValidatorForm.addValidationRule('passwordLength', (value) => {
              if (value.length < 5) {
                  return false;
              }
              return true;
            });

        return () => {        };
    }, [user])

    // STYLES
    const containerStyle = {
        border: '1px solid lightgrey',
        boxShadow: '4px 5px 5px 1px rgba(0,0,0,0.14)',
        width: '25%',
        height: '80%',
        margin: '13% 0 1% 0',
    }

    const headerStyle = {
        background: `#4B6573`, 
        margin: `0`, 
        color: `white`, 
        padding: `30px 20px`, 
        borderTopLeftRadius: `3px`, 
        borderTopRightRadius: `3px`
    }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    }

    if(success)
        return <Redirect to={{pathname: '/', state:'newUser' }} />

    if(localStorage.getItem('token'))
        return <Redirect to='/dashboard'/>

    return (
        <div style={{display:`flex`, flexDirection:`column`, alignItems:`center`}}>
            <Paper style={containerStyle}>
                <h3 style={headerStyle}>Sign Up</h3>

                <ValidatorForm
                    style={formStyle}
                    onSubmit={handleSubmit}
                    onError={errors => console.log(errors)}>

                    <TextValidator
                        style={{ padding: '10px 0' }}
                        label="Username"
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        name="username"
                        value={user.username}
                        validators={['required']}
                        errorMessages={['This Field is Required']}
                    ></TextValidator>

                    <TextValidator
                        style={{ padding: '10px 0' }}
                        type="password"
                        label="Password"
                        onChange={(e) => setUser({...user, password: e.target.value}) }
                        name="password"
                        value={user.password}
                        validators={['required', 'passwordLength']}
                        errorMessages={['This Field is Required', 'Password Too Short!']}
                        autoComplete="false"
                    ></TextValidator>

                    <TextValidator
                        style={{ padding: '10px 0' }}
                        type="password"
                        label="Confirm Password"
                        onChange={(e) => setUser({...user, cPassword: e.target.value})}
                        name="cPassword"
                        value={user.cPassword}
                        validators={['isPasswordMatch','required']}
                        errorMessages={['Password Mismatch', 'This Field is Required']}
                        autoComplete="false"
                    ></TextValidator>

                    <Button type="submit">Submit</Button>
                </ValidatorForm>
            </Paper>
            
            <Link style={{width:`25%`}} to="/">Already have an account? Sign in</Link>
        </div>
    )
}
