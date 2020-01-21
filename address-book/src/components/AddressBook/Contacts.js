import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import EditContacts from './Actions/EditContacts';
import AddContacts from './Actions/AddContacts';
import { TextField } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import Button from '@material-ui/core/Button';

export default function Contacts(){
    const [editmodal, setEditModal] = useState(false)
    const [data, setData] = useState({})
    const [addmodal, setAddModal] = useState(false)
    const [sort, setSort] = useState('ASC')
    const [name, setName] = useState({uname: '', email: ''});
    const [state, setState] = useState({
        columns: [
            { title: 'First Name', field: 'f_name' },
            { title: 'Last Name', field: 'l_name' },
            { title: 'Mobile Phone (+63)', field: 'mobile_phone'},
        ],
    });

    useEffect(() => {
        axios
        .get('http://localhost:5001/api/users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(res=>{
            axios
            .get(`http://localhost:5001/api/contact/${localStorage.getItem('id')}`)
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
                setName(e =>{ 
                    return {...e, uname:res.data.username, email:res.data.email};
                })
            })
    },[])
    var onDelete = e => {
        axios
        .delete(`http://localhost:5001/api/contact/${e.id}`)
        .then(res=>{
            console.log(res)
        })
    }
    const eventHandler = (e) => {
        // console.log(e.target.value)
        axios
        .get(`http://localhost:5001/api/search/${localStorage.getItem('id')}?value=${e.target.value}`)
        .then(res=>{
            setState(contact=>{
                return{ ...contact, data:res.data };
            })
        })
    }
    const sortTableAsc = () => {
        if(sort === 'ASC'){
            axios
            .get(`http://localhost:5001/api/sort/${localStorage.getItem('id')}?value=ASC`)
            .then(res=>{
                setState(name => {
                    return{ ...name, data:res.data }
                })
            })
            setSort('DESC')
        }else if(sort === 'DESC'){
            axios
            .get(`http://localhost:5001/api/sort/${localStorage.getItem('id')}?value=DESC`)
            .then(res=>{
                setState(name => {
                    return{ ...name, data:res.data }
                })
            })
            setSort('ASC')
        }
        
    }

    return (
        <React.Fragment>
            <div style={{float:'right', marginRight: '3%', borderRadius: '2px'}}>
                <Button style={{marginTop: '6%'}}>
                    <SortByAlphaIcon  onClick={sortTableAsc}/>
                </Button>
                <TextField label='Search...' onChange={eventHandler}/>
                {/* <SearchIcon /> */}
            </div>

            <MaterialTable
                style={{width: '95%', margin: '70px auto'}}
                options={{
                    filtering: false, 
                    headerStyle: {backgroundColor: '#f5f5f5'}, 
                    actionsColumnIndex: -1,
                    sorting: false,
                    search: false,
                }}
                title={`Welcome ${name.uname}!`}
                columns={state.columns}
                data={state.data}
                onRowClick={(event, rowData, togglePanel) => {
                    setData(rowData)
                    setEditModal(true)
                }}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Add Contact',
                        isFreeAction: true,
                        onClick: (event) => {
                            setAddModal(true)
                        }
                    }
                ]}
                editable={{
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
            <EditContacts
                modal={editmodal}
                setData={setData}
                data = {data}
                setModal={setEditModal}
            />
            <AddContacts
                addmodal={addmodal}
                setAddModal={setAddModal}
                // setData={setContact}
                // data={contact}
            />
        </React.Fragment>
    )
}