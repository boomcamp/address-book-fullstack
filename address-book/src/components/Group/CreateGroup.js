import React, {useState} from 'react'
import axios from 'axios'
import GroupSelect, {GroupCreate} from '../tools/fields/GroupSelect'
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';

    const addGroupStyle = {
        // width:`30%`, 
        cursor:`pointer`,
        color: `#4c6571`,
        textAlign:`right`,
    }
function CreateGroup({row, closeFn, enqueueSnackbar}) {
    const [group, setGroup] = useState({
        groupExist: false,
    })
    const [user, setUser] = useState({groupName: ""})

    const handleSubmit = () => {
        row.map(x => {
            return (
                axios({
                    method: 'put',
                    url: `/api/contacts/${x.id}?userId=${x.userid}`,
                    data: {
                        "firstName": x.firstName,
                        "lastName": x.lastName,
                        "homePhone": x.homePhone,
                        "mobilePhone": x.mobilePhone,
                        "workPhone": x.workPhone,
                        "email": x.email,
                        "city": x.city,
                        "stateProvince": x.stateProvince,
                        "postalCode": x.postalCode,
                        "country": x.country,

                        "groupName": user.groupName,
                    }, 
                    headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                })
                .then(res => {
                    console.log(res.data)
                    closeFn();
                })
                .catch(err => {
                    console.log(err)
                })
            )
        })
        enqueueSnackbar('Successfully Added to group', { variant: 'success', autoHideDuration: 1500, })
    }

    return (
        <div style={{display:`flex`, flexDirection:`column`, textAlign:`center`}}>
            <h1>Add Contacts to Group</h1>
            { (!group.groupExist) ? 
                    <GroupCreate group={user.groupName} groupNameFn={(e) => setUser({...user, groupName: e.target.value} )}>
                        <span style={addGroupStyle} onClick={() => setGroup({...group, groupExist: true})} href="">Add to Existing Group</span>
                    </GroupCreate>
                : (group.groupExist || user.groupName) ? 
                    <GroupSelect group={user.groupName} groupNameFn={(e) => setUser(prevState => { return {...prevState, groupName: e.target.value} })}>
                        <span style={addGroupStyle} onClick={() => setGroup({...group, groupExist: false})} href="">Add to New Group</span>
                    </GroupSelect>
                : null } 

            <Button type="submit" style={{backgroundColor:`#4c6572`, color:`white`, margin:`30px 0`}} onClick={handleSubmit}>Create Group</Button>
        </div>
    )
}

export default withSnackbar(CreateGroup);