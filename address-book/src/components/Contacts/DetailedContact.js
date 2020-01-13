import React, {useState, useEffect} from 'react'
import dp from '../../assets/download.jpeg'

import PhoneIcon from '@material-ui/icons/Phone';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import WorkIcon from '@material-ui/icons/Work'; 

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
    box: {margin:`50px`, alignItems:`center`},
    address: {
        textAlign:`center`, 
        fontWeight:`normal`,
        margin:`10px 0`
    }
}

export default function DetailedContact({row}) {
    const [user, setUser] = useState({firstName: "", lastName: "", homePhone: "", mobilePhone: "", workPhone: "", email: "", city: "", stateProvince: "", postalCode: "", country: "" });

    useEffect(() => {
        setUser({
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
                     <p><b>Work Phone: </b></p> <WorkIcon/> {user.workPhone}
                </div>
            </div>       
        </React.Fragment>
    )
}
