import React from 'react'
import { TextValidator } from 'react-material-ui-form-validator';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';


export default function NameFields({firstnameFn, lastnameFn, firstname, lastname}) {
    return (
        <React.Fragment>
            <TextValidator
                variant="outlined"
                label="Firstname"
                onChange={firstnameFn}
                name="firstname"
                value={firstname}
                validators={['required']}
                errorMessages={['This Field is Required']}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
           
            ></TextValidator>

            <TextValidator
                variant="outlined"
                style={{ margin: '10px 0 20px 0' }}
                label="Lastname"
                onChange={lastnameFn}
                name="lastname"
                value={lastname}
                validators={['required']}
                errorMessages={['This Field is Required']}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                }}
            ></TextValidator>
        </React.Fragment>
    )
}
