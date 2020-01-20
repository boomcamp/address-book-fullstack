import React, { useState } from 'react'
import axios from 'axios'
import MaterialTable, {MTableToolbar} from 'material-table';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';


import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import PopUpModal from './PopUpModal'
import CreateContactForm from '../Contacts/CreateContactForm'
import DetailedContact from '../Contacts/DetailedContact'
import CreateGroup from '../Group/CreateGroup'
import UpdateGroup from '../tools/fields/UpdateGroup'

    const btnStyle = {
        display: `flex`,
        alignItems: `center`,
        border: `none`,
        backgroundColor: `#e1e2e1`,
        cursor: `pointer`,
        borderRadius: `5px`,
        padding: `10px`,
        margin: `5px`,
        width: `140px`
    }

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
        width: `130px`,
        ":hover": {
            color:`red`,
            background: "#efefef"
        },
    }

function Table({ groupObj, updateTableFn, updateGroupListFn, state, setStateFn,  enqueueSnackbar}) {
    const [open, setOpen] = useState({
        create: false,
        detailedContact: {
            openModal: false,
            row: {}
        },
        group: false,
        createGroup: {
            openModal: false,
            row:[]
        }
    });

    const theme = createMuiTheme({
        palette: {
          primary: {
            main: '#4B6573',
          },
          secondary: {
            main: '#334854',
          },
        },
  
    });

    const createRow = (newData) => {
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                updateTableFn()
                // createFn(newData)
            }, 600);
        }).then(res => {
            if(!groupObj){
                enqueueSnackbar('Successfully Created', { variant: 'success', autoHideDuration: 1000, })
            }
            if(groupObj)
                enqueueSnackbar('Successfully Added to Group', { variant: 'success', autoHideDuration: 1000, })
            
        })
    }

    const deleteContacts = (data) => {
        data.map(x => {
            if (!groupObj) {
                axios
                    .delete('/api/contacts/' + x.id, {
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('token')
                        }
                    })
                    .then(res => { setStateFn(x) })
                    .catch(err => { console.log(err) })
            }

            if (groupObj) {
                axios
                    .put('/api/groups/' + x.id, {
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('token')
                        }
                    })
                    .then(res => {  setStateFn(x) })
                    .catch(err => { console.log(err) })
            }
        })
        enqueueSnackbar('Successfully Removed from the group', { variant: 'success', autoHideDuration: 1500, })
    }

    const deleteGroup = (id) => {
        axios
        .delete('/api/groups/' + id, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => {
            // console.log(res.data)
            updateGroupListFn(res.data)
            enqueueSnackbar('Successfully Deleted', { variant: 'success', autoHideDuration: 1000, })
        })
        .catch(err => { console.log(err) })
    }

    const handleSort = (e) => {
        updateTableFn(e.target.value)
    }
    return (
        <React.Fragment>
            <PopUpModal
                title="Create New Contact"
                open={open.create}
                closeFn={() => setOpen({ ...open, create: false })}
            >
                <CreateContactForm addGroupId={(groupObj) ? groupObj.id : null} createRowFn={createRow} closeFn={() => setOpen({ ...open, create: false })} />
            </PopUpModal>

            <PopUpModal
                title="Contact Details"
                open={open.detailedContact.openModal}
                closeFn={() => setOpen({ ...open, detailedContact: { openModal: false } })}
            >
                <DetailedContact row={open.detailedContact.row} />
            </PopUpModal>

            <PopUpModal
                title="Update Group"
                open={open.group}
                closeFn={() => setOpen({ ...open, group: false })}
            >
                <UpdateGroup updateGroupListFn={updateGroupListFn} groupObj={groupObj} closeFn={() => setOpen({ ...open, group: false })}/>
            </PopUpModal>

            <PopUpModal
                title="Add Contacts to Group"
                open={open.createGroup.openModal}
                closeFn={() => setOpen({ ...open, createGroup: false })}
            >
                <CreateGroup row={open.createGroup.row} closeFn={() => setOpen({ ...open, createGroup: {openModal: false}}) } />
            </PopUpModal>


            <MuiThemeProvider theme={theme}>
                <MaterialTable
                    title=""
                    columns={state.columns}
                    data={state.data}
                    actions={[
                        {
                            icon: 'add',
                            tooltip: 'Create New Contact',
                            isFreeAction: true,
                            onClick: () => setOpen({ ...open, create: true })

                        },
                        {
                            icon: 'group',
                            tooltip: 'Add to Group',
                            onClick: (event, rowData) => setOpen({...open, createGroup: {openModal: true, row: rowData}})
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete Contact',
                            onClick: (event, rowData) => {
                                if (window.confirm((!groupObj) ? 'Are you sure to delete this Contact/s?' : 'Are you sure you want to remove this from the Group?')) {
                                    new Promise(resolve => {
                                        setTimeout(() => {
                                            resolve();
                                            deleteContacts(rowData)
                                        }, 600);
                                    })
                                }
                            }
                        },
                

                    ]}
                    onRowClick={(e, rowData, togglePanel) => {                  
                        setOpen({ ...open, detailedContact: { openModal: true, row: rowData } });
                    } }
                    options={{
                        sorting:false,
                        selection: true,
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
                                <MTableToolbar {...props} style={{backgroundColor:`red`}}/>
                                <div style={{ padding: '0px 10px', display:`flex`, justifyContent:`space-between`}}>
                                    <select style={btnStyle} onChange={handleSort} value={(state.sort)&&state.sort.sort}>
                                        <option style={{color:`grey`}} value="">Sort By Lastname</option>
                                        <option value="ASC">Ascending</option>
                                        <option value="DESC">Descending</option>                                        
                                    </select>
                                    {(groupObj) ? (
                                        <div style={{display:`flex`, flexDirection:`row`}}>
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
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ),
                    }}
                    // isLoading={true}
                />
            </MuiThemeProvider>
        </React.Fragment>
    )
}

export default withSnackbar(Table);