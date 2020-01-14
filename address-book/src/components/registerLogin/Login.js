import React, { useState} from 'react'
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
        width: '450px',
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
        padding: '20px',
    }

function Login() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    })
    const [status, setStatus] = useState({error: false, success: false});
    const [showPassword, setShowpassword] = useState(false)

    const handleSubmit = () => {
        axios.post(`/api/login`, {
            "username": user.username,
            "password": user.password
        })
        .then(res => {
            sessionStorage.setItem('token', res.data.token)
            sessionStorage.setItem('userId', res.data.id) // THIS IS TEMP PLEASE UPDATE! THIS MUST NOT BE HERE
            setStatus({...status, success: true})
        })
        .catch(err => {
            console.log(err)
            setStatus({...status, error: true})
        })
    }

    if(status.success || sessionStorage.getItem('token'))
        return <Redirect to='/dashboard' />

    return (
        <div style={{display:`flex`, flexDirection:`column`, alignItems:`center`}}>
            <Paper style={containerStyle} className="container">
                <h3 style={headerStyle}>Login</h3>  

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
                        error={status.error}
                        variant="outlined"
                        style={{margin:`5px 0`}}
                        type="password"
                        label="Password"
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        name="password"
                        value={user.password}
                        validators={['required']}
                        errorMessages={['This Field is Required']}
                        autoComplete="false"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowpassword(!showPassword) }
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    ></TextValidator>
                    
                    { (status.error) ? <h5 style={{color:`red`, margin:`5px`}}>Incorrect Username/Password</h5> : null}
                    
                    <Button type="submit">Login</Button>
                </ValidatorForm>
            </Paper>

            <Link to="/signup">Didn't have an account? Sign up</Link>
        </div>
    )
}

export default Login