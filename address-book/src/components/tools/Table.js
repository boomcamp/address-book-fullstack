import React, { useState } from 'react'
import axios from 'axios'
import MaterialTable, {MTableToolbar} from 'material-table';
import { withSnackbar } from 'notistack';


import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import PopUpModal from './PopUpModal'
import CreateContactForm from '../Contacts/CreateContactForm'
import UpdateContactForm from '../Contacts/UpdateContactForm'
import DetailedContact from '../Contacts/DetailedContact'
import UpdateGroup from '../tools/fields/UpdateGroup'

    const btnStyleDelete = {
        display: `flex`,
        alignItems: `center`,
        border: `none`,
        color: `white`,
        backgroundColor: `#f83e3f`,
        cursor: `pointer`,
        borderRadius: `5px`,
        padding: `10px`,
        margin: `5px`,
        width: `130px`
    }

    const btnStyleEdit = {
        display: `flex`,
        alignItems: `center`,
        border: `none`,
        color: `white`,
        backgroundColor: `#4c6572`,
        cursor: `pointer`,
        borderRadius: `5px`,
        padding: `10px`,
        margin: `5px`,
        width: `130px`
    }

function Table({ groupObj, updateGroupListFn, state, setStateFn, createFn, updateFn, enqueueSnackbar}) {
    const [open, setOpen] = useState({
        create: false,
        update: {
            openModal: false,
            row: {}
        },
        detailedContact: {
            openModal: false,
            row: {}
        },
        group: false
    });

    const createRow = (newData) => {
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                createFn(newData)
            }, 600);
        }).then(res => {
            if(!groupObj)
                enqueueSnackbar('Successfully Created', { variant: 'success', autoHideDuration: 1000, })
            if(groupObj)
                enqueueSnackbar('Successfully Added to Group', { variant: 'success', autoHideDuration: 1000, })
        })
    }

    const updateRow = (oldData, newData) => {
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                if (oldData) {
                    updateFn(oldData, newData)
                }
            }, 600);
        }).then(res => {
            enqueueSnackbar('Successfully Updated', { variant: 'success', autoHideDuration: 1000, })
        })
    }

    const deleteRow = (oldData) => {
        if(!groupObj){
            axios
            .delete('/api/contacts/' + oldData.id, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            .then(res => {
                // console.log(res)
                enqueueSnackbar('Successfully Deleted', { variant: 'success', autoHideDuration: 1000, })
            })
            .catch(err => { console.log(err) })
        }

        if(groupObj){
            axios
            .put('/api/groups/' + oldData.id, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                }
            })
            .then(res => {
                // console.log(res)
                enqueueSnackbar('Successfully Removed from the group', { variant: 'success', autoHideDuration: 1500, })
            })
            .catch(err => { console.log(err) })
        }
    }

    const deleteGroup = (id) => {
        axios
        .delete('/api/groups/' + id, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => {
            console.log(res.data)
            updateGroupListFn(res.data)
            enqueueSnackbar('Successfully Deleted', { variant: 'success', autoHideDuration: 1000, })
        })
        .catch(err => { console.log(err) })
    }

    return (
        <React.Fragment>
            <PopUpModal
                open={open.create}
                closeFn={() => setOpen({ ...open, create: false })}
            >
                <CreateContactForm addGroupId={(groupObj) ? groupObj.id : null} createRowFn={createRow} closeFn={() => setOpen({ ...open, create: false })} />
            </PopUpModal>

            <PopUpModal
                open={open.update.openModal}
                closeFn={() => setOpen({ ...open, update: { openModal: false } })}
            >
                <UpdateContactForm updateRowFn={updateRow} row={open.update.row} closeFn={() => setOpen({ ...open, update: { openModal: false } })} />
            </PopUpModal>

            <PopUpModal
                open={open.detailedContact.openModal}
                closeFn={() => setOpen({ ...open, detailedContact: { openModal: false } })}
            >
                <DetailedContact row={open.detailedContact.row} />
            </PopUpModal>

            <PopUpModal
                open={open.group}
                closeFn={() => setOpen({ ...open, group: false })}
            >
                <UpdateGroup updateGroupListFn={updateGroupListFn} groupObj={groupObj} closeFn={() => setOpen({ ...open, group: false })}/>
            </PopUpModal>


            <MaterialTable
                title=""
                columns={state.columns}
                data={state.data}
                editable={{
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                setStateFn(oldData);
                            }, 600);
                        }).then(deleteRow(oldData)),
                }}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Create New Contact',
                        isFreeAction: true,
                        onClick: () => setOpen({ ...open, create: true })

                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit Contact',
                        onClick: (event, rowData) => setOpen({ ...open, update: { openModal: true, row: rowData } })
                    },
                ]}
                onRowClick={(event, rowData, togglePanel) => setOpen({ ...open, detailedContact: { openModal: true, row: rowData } }) }
                options={{
                    pageSize: 10,
                    actionsColumnIndex: -1,
                    headerStyle: {
                        fontWeight: `bold`,
                        textTransform: `uppercase`
                    },
                }}
                components={{
                    Toolbar: props => (
                        <div>
                            <MTableToolbar {...props} />
                            <div style={{ padding: '0px 10px', display:`flex`}}>
                                {/* <button style={btnStyle} onClick={() => setOpen({ ...open, group: true })}><GroupAddIcon /> &nbsp;Create Group</button> */}
                                {(groupObj) ? (
                                    <>
                                        <button style={btnStyleEdit} onClick={() => setOpen({ ...open, group: true })}><EditIcon /> &nbsp;Edit Group</button>
                                        <button 
                                            style={btnStyleDelete} 
                                            onClick={() => { 
                                                if(window.confirm('Are you sure to delete this group?')){
                                                    deleteGroup(groupObj.id)      
                                                }
                                            }}><DeleteIcon /> 
                                            &nbsp;Delete Group
                                        </button>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    ),
                }}
                // isLoading={true}
            />
        </React.Fragment>
    )
}

export default withSnackbar(Table);