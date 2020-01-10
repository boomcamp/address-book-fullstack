import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';

import NameFields from '../tools/fields/NameFields'
import ContactFields from '../tools/fields/ContactFields'
import AddressFields from '../tools/fields/AddressFields'

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
}

export default function CreateContactForm({closeFn}) {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        homePhone: "",
        mobilePhone: "",
        workPhone: "",
        email: "",
        city: "",
        stateProvince: "",
        postalCode: "",
        country: "",

    })

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: '/api/contacts/' + sessionStorage.getItem('userId'),
            data: {
                "firstName": user.firstname,
                "lastName": user.lastname,
                "homePhone": user.homePhone,
                "mobilePhone": user.mobilePhone,
                "workPhone": user.workPhone,
                "email": user.email,
                "city": user.city,
                "stateProvince": user.stateProvince,
                "postalCode": user.postalCode,
                "country": user.country,
            }, 
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res)
            closeFn();
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <React.Fragment>
            <h1 style={{textAlign:`center`}}>Create New Contact</h1 >
            <ValidatorForm
                style={formStyle}
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)}>
            
                <NameFields 
                    firstnameFn = {(e) => setUser({ ...user, firstname: e.target.value })}
                    lastnameFn = {(e) => setUser({ ...user, lastname: e.target.value })}
                    firstname = {user.firstname}
                    lastname = {user.lastname}
                />
                
                <div style={{display: `flex`, margin:`0 0 30px 0`}}>
                    <ContactFields 
                        homePhoneFn = {(e) => setUser({ ...user, homePhone: e.target.value })}
                        mobilePhoneFn = {(e) => setUser({ ...user, mobilePhone: e.target.value })}
                        workPhoneFn = {(e) => setUser({ ...user, workPhone: e.target.value })}
                        emailFn = {(e) => setUser({ ...user, email: e.target.value })}
                        homePhone = {user.homePhone}
                        mobilePhone = {user.mobilePhone}
                        workPhone = {user.workPhone}
                        email = {user.email}
                    />       
            
                <AddressFields 
                        cityFn = {(e) => setUser({ ...user, city: e.target.value })}
                        stateProvinceFn = {(e) => setUser({ ...user, stateProvince: e.target.value })}
                        postalCodeFn ={(e) => setUser({ ...user, postalCode: e.target.value })}
                        countryFn = {(e) => setUser({ ...user, country: e.target.value })}
                        city = {user.city}
                        stateProvince = {user.stateProvince}
                        postalCode ={user.postalCode}
                        country = {user.country}
                />
                </div>

                <Button type="submit">Submit</Button>
            </ValidatorForm>
        </React.Fragment>
    )
}
