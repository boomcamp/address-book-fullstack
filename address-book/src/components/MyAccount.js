import React, {useState, useEffect} from 'react'
import axios from 'axios'
import dp from '../assets/download.jpeg'
import construction from '../assets/construction.jpeg'
import TemplateMainPage from './tools/TemplateMainPage'
import Paper from '@material-ui/core/Paper';

    // STYLES
    const style = {
        container: {
            padding: `50px`,
            border: '1px solid lightgrey',
            boxShadow: '4px 5px 5px 1px rgba(0,0,0,0.14)',
            width: '80%',
            // height: 'auto',
            margin: '0 auto',
        },
        box: {
            display: `flex`, 
            alignItems:`center`, 
            justifyContent:`space-around`
        }
    }

export default function MyAccount() {
    const [user, setUser] = useState();

    useEffect(() => {
        axios({
            method: 'get',
            url:  '/api/user/' + sessionStorage.getItem('userId'),
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })

        return () => {  };
    }, [])
    
    return (
        <TemplateMainPage>
            <Paper style={style.container}>
                {/* <div style={style.box}>
                    <img src={dp} alt="profile_picture" width="300" height="300"/>

                    <div>
                        
                    </div>
                </div> */}
                <img src={construction} alt="construction" style={{width: `100%`}}/>
            </Paper>
        </TemplateMainPage>
    )
}
