import React, {useState} from 'react'
import axios from 'axios'
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import GroupIcon from '@material-ui/icons/Group';
import Button from '@material-ui/core/Button';

export default function UpdateGroup({updateGroupListFn, groupObj, closeFn}) {
    const [group, setGroup] = useState(groupObj.groupName)

    const handleSubmit = () => {
        axios({
            method: `put`,
            url:`/api/group/` + groupObj.id,
            data: {
                "groupName": group,
            },
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res)
            updateGroupListFn(res.data)
            closeFn();
        })
        .catch(err => console.log(err))
    }

    return (
        <div style={{display:`flex`, flexDirection:`column`}}>
            <h1 style={{textAlign:`center` }}>Update Group</h1>
            <TextField
                variant="outlined"
                label="Group Name"
                onChange={(e) => setGroup(e.target.value)}
                name="groupName"
                value={group}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <GroupIcon />
                        </InputAdornment>
                    ),
                }}
            />
             <Button 
                type="submit" 
                style={{backgroundColor:`#4c6572`, color:`white`, margin:`30px 0`}} 
                onClick={handleSubmit}>
                    
                Update Group
            </Button>
        </div>
    )
}
