import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import { ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';

import NameFields from '../tools/fields/NameFields'
import ContactFields from '../tools/fields/ContactFields'
import AddressFields from '../tools/fields/AddressFields'
import GroupSelect, {GroupCreate} from '../tools/fields/GroupSelect';

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

export default function UpdateContactForm({ updateRowFn, closeFn, row }) {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [user, setUser] = useState({
        groupId: "", 
        groupName: "",
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
    const [group, setGroup] = useState({
        groupExist: true,
    })

    useEffect(() => {
        setUser({
            groupId: row.groupId,
            firstname: row.first_name,
            lastname: row.last_name,
            homePhone: row.home_phone,
            mobilePhone: row.mobile_phone,
            workPhone: row.work_phone,
            email: row.email,
            city: row.city,
            stateProvince: row.state_province,
            postalCode: row.postal_code,
            country: row.country
        })

        axios({
            method: 'get',
            url: '/api/groups/' + row.groupid,
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => {
            if(res.data.length !== 0)
                setUser(prevState => {return {...prevState, groupName: res.data[0].group_name}})
            else    
                setUser(prevState => {return {...prevState, groupName: ""}})
        })
        .catch(err => console.log(err))

        window.addEventListener("resize", (WindowSize, event) => setWindowSize(window.innerWidth));

        return () => {window.addEventListener("resize", null); };
    }, [])
    
    const handleSubmit = () => {
        axios({
            method: 'put',
            url: `/api/contacts/${row.id}?userId=${row.userid}`,
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

                "group_name": user.groupName
            }, 
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => {
            // console.log(res.data[0])
            updateRowFn(row, res.data[0])
            closeFn();
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <React.Fragment>
            {/* <h1 style={{textAlign:`center`}}>Update Contact</h1 > */}
            <ValidatorForm
                onClick={(e) => e.stopPropagation()}
                style={formStyle}
                onSubmit={handleSubmit}
                onError={errors => console.log(errors)}>
            
                <NameFields 
                    firstnameFn = {(e) => setUser({ ...user, firstname: e.target.value })}
                    lastnameFn = {(e) => setUser({ ...user, lastname: e.target.value })}
                    firstname = {user.firstname}
                    lastname = {user.lastname}
                />
                
                <div style={{display: `flex`, margin:`0 0 30px 0`, flexDirection:(windowSize<426)?`column`:`row`}}>
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

                { (!group.groupExist) ? 
                    <GroupCreate group={user.groupName} groupNameFn={(e) => setUser({...user, groupName: e.target.value} )}>
                        <span style={addGroupStyle} onClick={() => setGroup({...group, groupExist: true})} href="">Add to Existing Group</span>
                    </GroupCreate>
                : (group.groupExist || user.groupName) ? 
                    <GroupSelect group={user.groupName} groupNameFn={(e) => setUser(prevState => { return {...prevState, groupName: e.target.value} })}>
                        <span style={addGroupStyle}  onClick={() => setGroup({...group, groupExist: false})} href="">Add to New Group</span>
                    </GroupSelect>
                : null }

                <Button type="submit" style={{backgroundColor:`#4c6572`, color:`white`, margin:`30px 0 0 0`}}>Update</Button>
            </ValidatorForm>
        </React.Fragment>
    )
}
