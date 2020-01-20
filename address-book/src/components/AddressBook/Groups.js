import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import AddGroup from './Actions/Addgroup';
// import AddGroupContact from './Actions/AddGroupContact';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Groups(){
    const [addModal, setAddModal] = useState(false);
    // const [addContactModal, setAddContactModal] = useState(false);
    const [data, setData] = useState({
        columns: [
            {title: 'Group Name', field: 'group_name'},
            {title: 'Date Created', field: 'date_created'}
        ]
    })
    const [contacts, setContacts] = useState({fname: '', lname: '', mobile_phone: ''})

    useEffect(()=>{
        axios
        .get('http://localhost:5001/api/groups')
        .then(res => {
            setData(groups =>{
                return{...groups, data:res.data}
            })
        })

        axios
        .get('http://localhost:5001/api/contacts')
        .then(res => {
            res.data.map((x)=>{
                setContacts(contact =>{
                    return{ ...contact, fname:x.f_name, lname:x.l_name, mobile_phone:x.mobile_phone}
                })
            })
        })
    },[])
    
    const onUpdate = (e) => {
        axios
        .patch(`http://localhost:5001/api/group/${e.id}`,{
            "group_name": e.group_name
        })
        .then(res=>{
            console.log(res)
        })
    }
    const onDelete = (e) => {
        axios
        .delete(`http://localhost:5001/api/group/${e.id}`)
        .then(res=>{
            console.log(res)
        })
    }
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return(
        <React.Fragment>
            <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    ADD
                </Button>
                <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                    {console.log(data.data)}
                </Menu>
            </div>
            <MaterialTable
                style={{width: '70%', margin: '70px auto'}}
                options={{
                    filtering: false, 
                    headerStyle: {backgroundColor: '#f5f5f5'}, 
                    actionsColumnIndex: -1,
                    sorting: false,
                    search: false,
                }}
                title={'Group Contacts'}
                columns={data.columns}
                data={data.data}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Add Group',
                        isFreeAction: true,
                        onClick: ()=>{
                            setAddModal(true)
                        }
                    },
                    // {
                    //     icon: 'personAdd',
                    //     tooltip: 'Add Contact to this Group',
                    //     isFreeAction: true,
                    //     onClick: () => {
                    //         // handleClick()
                    //         // setAddContactModal(true)
                    //     }
                    // }
                ]}
                detailPanel={[
                    {
                        tooltip: 'account_circle',
                        render: rowData => {
                            return (
                                <div
                                  style={{
                                    fontSize: 10,
                                    textAlign: 'center',
                                    color: 'white',
                                    backgroundColor: '#FDD835',
                                  }}
                                >
                                    <h1>hello!</h1>
                                </div>
                            )
                        }
                    }
                ]}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                        resolve();
                        if (oldData) {
                            setData(prevState => {
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
                        setData(prevState => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                        });
                        }, 600);
                    }).then(onDelete(oldData)),
                }}
            />
            <AddGroup
                setModal={setAddModal}
                modal={addModal}
                // setData={setData}
                data={data} 
            />
            {/* <AddGroupContact
                setModal={setAddContactModal}
                modal={addContactModal}
                data={contacts}
            /> */}
        </React.Fragment>
    )
}