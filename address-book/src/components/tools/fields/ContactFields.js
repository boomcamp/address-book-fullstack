import React from 'react'
import { TextValidator } from 'react-material-ui-form-validator';

export default function ContactFields({homePhone, mobilePhone, workPhone, email, homePhoneFn, mobilePhoneFn, workPhoneFn, emailFn
}) {
    return (
        <fieldset>
            <legend>Contact Details:</legend>
            <TextValidator
                style={{ margin: '10px' }}
                label="Home Phone"
                onChange={homePhoneFn}
                name="homePhone"
                value={homePhone}
                validators={['required']}
                errorMessages={['This Field is Required']}
            ></TextValidator>
            <TextValidator
                style={{ margin: '10px' }}
                label="Mobile Phone"
                onChange={mobilePhoneFn}
                name="mobilePhone"
                value={mobilePhone}
                validators={['required']}
                errorMessages={['This Field is Required']}
            ></TextValidator>
            <TextValidator
                style={{ margin: '10px' }}
                label="Work Phone"
                onChange={workPhoneFn}
                name="workPhone"
                value={workPhone}
                validators={['required']}
                errorMessages={['This Field is Required']}
            ></TextValidator>
            <TextValidator
                style={{ margin: '10px' }}
                label="Email"
                onChange={emailFn}
                name="email"
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['This Field is Required', 'Email is not Valid']}
            ></TextValidator>
        </fieldset>
    )
}
