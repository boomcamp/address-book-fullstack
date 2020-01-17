import React from 'react'
import { TextValidator } from 'react-material-ui-form-validator';
import InputAdornment from '@material-ui/core/InputAdornment';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import WorkIcon from '@material-ui/icons/Work';
import EmailIcon from '@material-ui/icons/Email';

export default function ContactFields({ homePhone, mobilePhone, workPhone, email, homePhoneFn, mobilePhoneFn, workPhoneFn, emailFn
}) {
    return (
        <fieldset style={{width:`50%`}}>
            <legend>Contact Detail:</legend>
            <TextValidator
                style={{ margin: '10px', width: `95%` }}
                label="Home No."
                onChange={homePhoneFn}
                name="homePhone"
                value={homePhone}
                validators={['required', 'matchRegexp:^(\\+0?1\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$']}
                errorMessages={['This Field is Required', 'Invalid Phone Format. (XXX) XXX-XXXX']}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <HomeIcon />
                        </InputAdornment>
                    ),
                }}
            ></TextValidator>

            <TextValidator
                style={{ margin: '10px', width: `95%` }}
                label="Mobile No."
                onChange={mobilePhoneFn}
                name="mobilePhone"
                value={mobilePhone}
                validators={['required', 'matchRegexp:^(\\+0?1\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$']}
                errorMessages={['This Field is Required', 'Invalid Phone Format. (XXX) XXX-XXXX']}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PhoneIphoneIcon />
                        </InputAdornment>
                    ),
                }}
            ></TextValidator>

            <TextValidator
                style={{ margin: '10px', width: `95%` }}
                label="Work Phone"
                onChange={workPhoneFn}
                name="workPhone"
                value={workPhone}
                validators={['required', 'matchRegexp:^(\\+0?1\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$']}
                errorMessages={['This Field is Required', 'Invalid Phone Format. (XXX) XXX-XXXX']}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <WorkIcon />
                        </InputAdornment>
                    ),
                }}
            ></TextValidator>

            <TextValidator
                style={{ margin: '10px', width: `95%` }}
                label="Email"
                onChange={emailFn}
                name="email"
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['This Field is Required', 'Email is not Valid']}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    ),
                }}
            ></TextValidator>
        </fieldset>
    )
}
