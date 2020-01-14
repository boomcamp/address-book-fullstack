import React, {useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export default function Contacts(){
    const [name, setName] = useState({uname: '', email: ''});
    const [state, setState] = useState({
        columns: [
        { title: 'First Name', field: 'f_name' },
        { title: 'Last Name', field: 'l_name' },
        { title: 'Home Phone', field: 'home_phone', filtering: false },
        { title: 'Mobile Phone (+63)', field: 'mobile_phone', filtering: false },
        { title: 'Work Phone', field: 'work_phone', filtering: false },
        { title: 'Email', field: 'email', filtering: false },
        { title: 'City', field: 'city', filtering: false },
        { title: 'State/Province', field: 'state_or_province', filtering: false },
        { title: 'Postal Code', field: 'postal_code', filtering: false },
        { title: 'Country', field: 'country', filtering: false },
        ],
    });

    useEffect(() => {
        axios
        .get('http://localhost:5001/api/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res=>{
            axios
            .get('http://localhost:5001/api/contacts')
            .then(res => {
                setState(contact=>{
                    return{ ...contact, data:res.data };
                })
            })
        })

        axios
        .get(`http://localhost:5001/api/user/${localStorage.getItem('id')}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res=>
            {
                setName(e =>{ return {...e, uname:res.data.username, email:res.data.email} })
            })
    },[])
    var onUpdate = e =>{
        axios
        .patch(`http://localhost:5001/api/contact/${e.id}`,{
            "f_name": e.f_name, 
            "l_name": e.l_name, 
            "home_phone": e.home_phone, 
            "mobile_phone": e.mobile_phone, 
            "work_phone": e.work_phone, 
            "email": e.email, 
            "city": e.city, 
            "state_or_province": e.state_or_province, 
            "postal_code": e.postal_code,
            "country": e.country
        },{ headers: 
            {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .catch(err=>{
            console.error(err)
        })
    }
    var onDelete = e => {
        axios
        .delete(`http://localhost:5001/api/contact/${e.id}`)
        .then(res=>{
            console.log(res)
        })
    }
    var onAdd = e => {
        if(e){
            axios
            .post('http://localhost:5001/api/contacts', {
                "userId": localStorage.getItem('id'),
                "f_name": e.f_name,
                "l_name": e.l_name,
                "home_phone": e.home_phone,
                "mobile_phone": e.mobile_phone,
                "work_phone": e.work_phone,
                "email": e.email,
                "city": e.city,
                "state_or_province": e.state_or_province,
                "postal_code": e.postal_code,
                "country": e.country
            }).then(res => {
                alert('Added New Contact')
            }).catch(err=>{
                console.error(err)
            })
        }else{
            alert("Please Fill up the whole form")
            window.location.reload(true)
        }
    }
    return (
        <MaterialTable
            style={{width: '95%', margin: '50px auto'}}
            options={{filtering: true, headerStyle: {backgroundColor: '#f5f5f5'}}}
            title={`Welcome ${name.uname}!`}
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const {f_name, l_name, home_phone, mobile_phone, work_phone, city, state_or_province, postal_code, country} = newData
                        if(f_name && l_name && home_phone && mobile_phone && work_phone && city && state_or_province && postal_code && country){
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }else{
                            reject()
                            alert("Please fill up the form properly")
                            window.location.reload(true)
                        }
                    }, 600);
                }).then(onAdd(newData)),
                onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    if (oldData) {
                        setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                        });
                    }
                    }, 600);
                }).then(onUpdate(newData)),
                onRowDelete: oldData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                    });
                    }, 600);
                }).then(onDelete(oldData)),
            }}
        />
    )
}