import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import AddGroup from './Actions/Addgroup';
import ViewGroupContacts from './Actions/ViewGroupContacts';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddGroupContact from './Actions/AddGroupContact';

export default function Groups(){
    const [memId, setMemId] = useState([])
    const [addContactModal, setAddContactModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [groupId, setGroupId] = useState({g_id: ''})
    const [data, setData] = useState({
        columns: [
            {title: 'Group Name', field: 'group_name'},
            {title: 'Date Created', field: 'date_created'}
        ]
    })

    useEffect(()=>{
        axios
        .get(`http://localhost:5001/api/groups/${localStorage.getItem('id')}`)
        .then(res => {
            setData(groups =>{
                return{...groups, data:res.data}
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
    const openModal = (e) => {
        setGroupId(c =>{return{ ...c, g_id:e}})
        setAddContactModal(true)
    }
    return(
        <React.Fragment>
            <MaterialTable
                style={{width: '65%', margin: 'auto'}}
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
                ]}
                
                detailPanel={rowData => {
                    return (
                        <div>
                            <Button title="Add Contact" aria-controls="simple-menu" aria-haspopup="true" onClick={() => openModal(rowData.id)}>
                                <PersonAddIcon/>
                            </Button>
                            <ViewGroupContacts
                                rowData={rowData}
                                setMemId={setMemId}
                            /> 
                        </div>
                    )
                }}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
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
                data={data} 
            />
            <AddGroupContact
                setModal={setAddContactModal}
                modal={addContactModal}
                memId={memId}
                id={groupId}
            />
        </React.Fragment>
    )
}