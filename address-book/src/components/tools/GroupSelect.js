import React , {useState, useEffect} from 'react'
import InputAdornment from '@material-ui/core/InputAdornment';
import GroupIcon from '@material-ui/icons/Group';
import MenuItem from '@material-ui/core/MenuItem';
// import { TextValidator } from 'react-material-ui-form-validator';
import TextField from '@material-ui/core/TextField';
import fetchGroupContact from '../tools/fetchGroupContact'

export default function GroupSelect({group, groupNameFn , children}) {
    const [groupName, setGroupName] = useState([])

    useEffect(() => {

        fetchGroupContact(`/api/groups?userId=` + sessionStorage.getItem('userId'))
        .then(res => setGroupName(res))
        
        return () => { };
    }, [])

    return (
        <React.Fragment>
            <TextField
                style={{margin:`0 0 8px 0`}}
                select
                label="Add to Existing Group"
                value={group}
                onChange={(e) => groupNameFn(e)}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <GroupIcon />
                    </InputAdornment>
                    ),
                }}
            >
                 <MenuItem value="" >
                    - Select Group -
                </MenuItem>
                { groupName.map(x => (
                        <MenuItem value={x.groupName} key={x.id}>
                            {x.groupName}
                        </MenuItem> )) 
                }
            </TextField>
            {children}
        </React.Fragment>
    )
}

export function GroupCreate({group, groupNameFn, children}){
    return (
        <React.Fragment>
            <TextField
                style={{margin:`0 0 8px 0`}}
                label="Add to new Group"
                onChange={(e) => groupNameFn(e)}
                name="groupName"
                value={group}
                // validators={['required']}
                // errorMessages={['This Field is Required']}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <GroupIcon />
                    </InputAdornment>
                    ),
                }}
            />
            {children}
        </React.Fragment>
    );
}