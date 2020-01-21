import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import GroupIcon from '@material-ui/icons/Group';
import { ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';

import GroupSelect, {GroupCreate} from '../tools/fields/GroupSelect'
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
        textAlign:`right`,
    }

export default function CreateContactForm({addGroupId, closeFn, createRowFn}) {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
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

    useEffect(() => {
        window.addEventListener("resize", (WindowSize, event) => setWindowSize(window.innerWidth));

        return () => {window.addEventListener("resize", null); };
    }, [])

    const handleSubmit = () => {
        axios({
            method: 'post',
            url: '/api/contacts/' + sessionStorage.getItem('userId'),
            data: {
                "first_name": user.firstname,
                "last_name": user.lastname,
                "home_phone": user.homePhone,
                "mobile_phone": user.mobilePhone,
                "work_phone": user.workPhone,
                "email": user.email,
                "city": user.city,
                "state_province": user.stateProvince,
                "postal_code": user.postalCode,
                "country": user.country,
                
                "groupAdd": group.groupAdd,
                "group_name": group.groupName,
                "groupId": addGroupId
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
            {/* <h1 style={{textAlign:`center`}}>Create New Contact</h1 > */}
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
                
                <div style={{display: `flex`, flexDirection:(windowSize<426)?`column`:`row`}}>
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
                            // countryFn = {(e) => setUser({ ...user, country: e.target.value })}
                            countryFn = {(country) => setUser({ ...user, country: country })}
                            city = {user.city}
                            stateProvince = {user.stateProvince}
                            postalCode ={user.postalCode}
                            country = {user.country}
                    />
                </div>
                { (!addGroupId) ?
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
                /> : null}

                { (group.groupAdd && !group.groupExist) ? 
                    <GroupCreate group={group.groupName} groupNameFn={(e) => setGroup({...group, groupName: e.target.value})}>
                        <span style={addGroupStyle} onClick={() => setGroup({...group, groupExist: true})} href="">Add to Existing Group</span>
                    </GroupCreate>
                : null }
                { (group.groupExist) ? 
                    <GroupSelect group={group.groupName} groupNameFn={(e) => setGroup({...group, groupName: e.target.value})}>
                        <span style={addGroupStyle} onClick={() => setGroup({...group, groupExist: false, groupAdd: true})} href="">Add to New Group</span>
                    </GroupSelect>
                : null }

                <Button type="submit" style={{backgroundColor:`#4c6572`, color:`white`, margin:`30px 0 0 0`}}>Create Contact</Button>
            </ValidatorForm>
        </React.Fragment>
    )
}