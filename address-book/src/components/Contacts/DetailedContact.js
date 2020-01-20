import React, {useState, useEffect} from 'react'
import dp from '../../assets/download.jpeg'
import axios from 'axios'

import fetchGroupContact from '../tools/fetchGroupContact'
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import WorkIcon from '@material-ui/icons/Work'; 
import GroupIcon from '@material-ui/icons/Group';

const style = {
    header: {
        textAlign:`center`, 
        margin:`30px 0`
    },
    user: {
        textAlign:`center`, 
        margin:`10px 0`
    },
    container: {
        display:`flex`,
        flexWrap: `wrap`,
        width:`100%`, 
        justifyContent:`space-around`, 
        alignItems:`top`
    },
    box: {margin:`0 0 20px 0`, alignItems:`center`, textAlign:`center`},
    address: {
        textAlign:`center`, 
        fontWeight:`normal`,
        margin:`10px 0`
    }
}

export default function DetailedContact({row}) {
    const [user, setUser] = useState({groupid: "", groupName: "", firstName: "", lastName: "", homePhone: "", mobilePhone: "", workPhone: "", email: "", city: "", stateProvince: "", postalCode: "", country: "" });

    useEffect(() => {
        
        setUser({
            groupId: row.groupId,
            firstName: row.first_name,
            lastName: row.last_name,
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
  
        return () => { };
    }, [])
    return (
        <React.Fragment>
            {/* <h1 style={style.header}>Contact Details</h1> */}
            <div style={style.container}>
                <img src={dp} alt="profile_picture" width="200" height="200" style={{borderRadius:`50%`, margin:`20px 0 0 0`}}/> 
                <div style={{margin:`0 50px`, width:`80%`}}>
                    <h1 style={style.user}>{user.firstName} {user.lastName}</h1>
                    <h5 style={style.address}>
                        🏠 : {user.city}, {user.stateProvince} {user.postalCode} {user.country} 
                        <br/> ✉️ :   <i style={{color:`blue`}}> {user.email}</i>
                    </h5>
                </div>

                <div style={style.box}>
                    <p><b>Home Phone: </b></p> <PhoneIcon/>  {user.homePhone} <br/><br/>
                    <p><b>Mobile Phone: </b></p> <PhoneIphoneIcon/> {user.mobilePhone}
                </div>

                <div style={style.box}>
                    <p><b>Work Phone: </b></p> <WorkIcon/> {user.workPhone} <br/><br/> 
                    <p><b>Group: </b></p> <GroupIcon/> {(user.groupName) ? user.groupName : <i style={{opacity:`0.5`}}>Not in a group</i>}
                </div>
            </div>    
        </React.Fragment>
    )
}
