import React, {useState, useEffect} from 'react'
import dp from '../../assets/download.jpeg'

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
    box: {margin:`40px`, alignItems:`center`, textAlign:`center`},
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
            firstName: row.firstName,
            lastName: row.lastName,
            homePhone: row.homePhone,
            mobilePhone: row.mobilePhone,
            workPhone: row.workPhone,
            email: row.email,
            city: row.city,
            stateProvince: row.stateProvince,
            postalCode: row.postalCode,
            country: row.country
        })

        fetchGroupContact(`/api/groups?userId=` + sessionStorage.getItem('userId'))
        .then(res => {
            res.map(x => {
                if(row.groupId == x.id)
                    setUser(prevState => {return {...prevState, groupName: x.groupName}})
            })
        })
        .catch(err => console.log(err))

        return () => { };
    }, [])

    return (
        <React.Fragment>
            <h1 style={style.header}>Contact Details</h1>
            <div style={style.container}>
                <div style={{margin:`0 30px`}}>
                    <img src={dp} alt="profile_picture" width="200" height="200" style={{borderRadius:`50%`}}/> 
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
