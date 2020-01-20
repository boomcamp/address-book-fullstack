import React, { useState, useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'

//MATERIAL UI
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';


  // STYLES
  const containerStyle = {
    border: '1px solid lightgrey',
    boxShadow: '4px 5px 5px 1px rgba(0,0,0,0.14)',
    width: '500px',
    // height: '80%',
    // margin: '13% 0 1% 0',
    margin:`250px auto 10px auto`
}

const headerStyle = {
    background: `#4B6573`, 
    margin: `0`, 
    color: `white`, 
    padding: `30px 20px`, 
    borderTopLeftRadius: `3px`, 
    borderTopRightRadius: `3px`,
    textAlign:`left`
}

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    }

export default function Signup() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        cPassword: "",
    })
    const [status, setStatus] = useState({success: false, error: false});
    const [showPassword, setShowpassword] = useState({ signPass: false, cPass:false});

    const handleSubmit = () => {
        axios.post(`/api/signup`, {
            "username": user.username,
            "password": user.password
        })
        .then(res => {
            console.log(res)
            setStatus({...status, success: true})
        })
        .catch(err => {
            console.log(err)
            setStatus({...status, error: true})
        })
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

    if(status.success)
        return <Redirect to={{pathname: '/', state:'newUser' }} />

    if(sessionStorage.getItem('token'))
        return <Redirect to='/dashboard'/>

    return (
        <div style={{textAlign:`center`}}>
            <Paper style={containerStyle} className="container">
                <h3 style={headerStyle}>Sign Up</h3>

                <ValidatorForm
                    style={formStyle}
                    onSubmit={handleSubmit}
                    onError={errors => console.log(errors)}>

                    <TextValidator
                        error={status.error}
                        variant="outlined"
                        style={{margin:`5px 0`}}
                        label="Username"
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        name="username"
                        value={user.username}
                        validators={['required']}
                        errorMessages={['This Field is Required']}
                    ></TextValidator>

                    <TextValidator
                        variant="outlined"
                        style={{margin:`5px 0`}}
                        type="password"
                        label="Password"
                        onChange={(e) => setUser({...user, password: e.target.value}) }
                        name="password"
                        value={user.password}
                        validators={['required', 'passwordLength']}
                        errorMessages={['This Field is Required', 'Password Too Short!']}
                        autoComplete="false"
                        type={showPassword.signPass ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowpassword({ ...showPassword, signPass: !showPassword.signPass }) }
                                    >
                                    {showPassword.signPass ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                          }}
                    ></TextValidator>

                    <TextValidator
                        variant="outlined"
                        style={{margin:`5px 0`}}
                        type="password"
                        label="Confirm Password"
                        onChange={(e) => setUser({...user, cPassword: e.target.value})}
                        name="cPassword"
                        value={user.cPassword}
                        validators={['isPasswordMatch','required']}
                        errorMessages={['Password Mismatch', 'This Field is Required']}
                        autoComplete="false"
                        type={showPassword.cPass ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowpassword({ ...showPassword, cPass: !showPassword.cPass }) }
                                    >
                                    {showPassword.cPass ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                          }}
                    ></TextValidator>
                      { (status.error) ? <h5 style={{color:`red`, margin:`5px`}}>Username Already Exist</h5> : null}
                    <Button type="submit">Signup</Button>
                </ValidatorForm>
            </Paper>
            
            <Link to="/">Already have an account? Sign in</Link>
        </div>
    )
}
