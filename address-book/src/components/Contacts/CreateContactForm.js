import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import GroupIcon from '@material-ui/icons/Group';
import MenuItem from '@material-ui/core/MenuItem';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';

import NameFields from '../tools/fields/NameFields'
import ContactFields from '../tools/fields/ContactFields'
import AddressFields from '../tools/fields/AddressFields'

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
    }

    const addGroupStyle = {
        // width:`30%`, 
        cursor:`pointer`,
        color: `#4c6571`,
    }

export default function CreateContactForm({closeFn, createRowFn}) {
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
        country: ""
    })
    const [group, setGroup] = useState({
        groupAdd:false,
        groupExist: false,
        groupName: "",
    })
    const [groupName, setGroupName] = useState([])

    useEffect(() => {
        axios({
            method: `get`,
            url: `/api/groups`,
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => {
            setGroupName(res.data)
        })
        .catch(err => {
            console.log(err)
        })

        return () => { };
    }, [])

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
                
                "groupAdd": group.groupAdd,
                "groupName": group.groupName
            }, 
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => {
            // console.log(res.data)
            createRowFn(res.data)
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
                
                <div style={{display: `flex`}}>
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
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={group.groupAdd}
                            onChange={(e) => setGroup({...group, groupAdd: e.target.checked, groupExist: false})}
                            value="groupAdd"
                            color="primary"
                        />
                    }
                    label="Add to Group"
                />

                { (group.groupAdd && !group.groupExist) ? 
                    <React.Fragment>
                        <TextValidator
                            style={{margin:`0 0 8px 0`}}
                            label="Group Name"
                            onChange={(e) => setGroup({...group, groupName: e.target.value})}
                            name="groupName"
                            value={group.groupName}
                            validators={['required']}
                            errorMessages={['This Field is Required']}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <GroupIcon />
                                </InputAdornment>
                                ),
                            }}
                        />
                        <span style={addGroupStyle} onClick={() => setGroup({...group, groupExist: true})} href="">Add to Existing Group</span>
                    </React.Fragment>
                : null }
                { (group.groupExist) ? 
                    <React.Fragment>
                        <TextValidator
                            style={{margin:`0 0 8px 0`}}
                            select
                            label="Group Name"
                            value={group.groupName}
                            onChange={(e) => setGroup({...group, groupName: e.target.value})}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <GroupIcon />
                                </InputAdornment>
                                ),
                            }}
                        >
                            {
                                groupName.map(x => (
                                    <MenuItem value={x.groupName} key={x.id}>
                                        {x.groupName}
                                    </MenuItem>
                                )) 
                            }
                            
                        </TextValidator>
                        <span style={addGroupStyle} onClick={() => setGroup({...group, groupExist: false, groupAdd: true})} href="">Add to New Group</span>
                    </React.Fragment>
                : null }

                <Button type="submit" style={{backgroundColor:`#4c6572`, color:`white`, margin:`30px 0`}}>Create Contact</Button>
            </ValidatorForm>
        </React.Fragment>
    )
}