import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable, { MTableToolbar } from 'material-table';
import { withSnackbar } from 'notistack';

import PopUpModal from '../tools/PopUpModal'
import CreateContactForm from './CreateContactForm'
import UpdateContactForm from './UpdateContactForm'
import DetailedContact from './DetailedContact'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

function AddressBookTable({ enqueueSnackbar }) {
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
    });
    const [state, setState] = useState({
        columns: [
            { title: "#", field: `tableData.id` },
            { title: 'Firstname', field: 'firstName' },
            { title: 'Lastname', field: 'lastName' },
            { title: 'Home Phone', field: 'homePhone' },
            { title: 'Mobile Phone', field: 'mobilePhone' },
            { title: 'Work Phone', field: 'workPhone' },
        ],
        data: [],
    });

    useEffect(() => {
        axios.get('/api/contacts/' + sessionStorage.getItem('userId'), {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => {
                setState(prevState => { return { ...prevState, data: res.data } })
            })
            .catch(err => {
                console.log(err)
            })

        return () => { };
    }, [])

    const createRow = (newData) => {
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                setState(prevState => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                });
            }, 600);
        }).then(res => {
            enqueueSnackbar('Successfully Created', { variant: 'success', autoHideDuration: 1000, })
        })
    }

    const updateRow = (oldData, newData) => {
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
        }).then(res => {
            enqueueSnackbar('Successfully Updated', { variant: 'success', autoHideDuration: 1000, })
        })
    }

    const deleteRow = (oldData) => {
        axios.delete('/api/contacts/' + oldData.id, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => { 
                console.log(res) 
                enqueueSnackbar('Successfully Deleted', {variant: 'success', autoHideDuration: 1000,})
            })
            .catch(err => { console.log(err) })
    }

    return (
        <React.Fragment>
            {/* MODAL FOR CREATE */}
            <PopUpModal
                open={open.create}
                closeFn={() => setOpen({ ...open, create: false })}
            >
                <CreateContactForm createRowFn={createRow} closeFn={() => setOpen({ ...open, create: false })} />
            </PopUpModal>

            {/* MODAL FOR UPDATE */}
            <PopUpModal
                open={open.update.openModal}
                closeFn={() => setOpen({ ...open, update: { openModal: false } })}
            >
                <UpdateContactForm updateRowFn={updateRow} row={open.update.row} closeFn={() => setOpen({ ...open, update: { openModal: false } })} />
            </PopUpModal>

            {/* MODAL FOR DETAILED CONTACT */}
            <PopUpModal
                open={open.detailedContact.openModal}
                closeFn={() => setOpen({ ...open, detailedContact: { openModal: false } })}
            >
                <DetailedContact row={open.detailedContact.row} />
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
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
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
                onRowClick={(event, rowData, togglePanel) => setOpen({ ...open, detailedContact: { openModal: true, row: rowData } })}
                options={{
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
                            <div style={{ padding: '0px 10px' }}>
                                <button style={{ display: `flex`, alignItems: `center` }}><GroupAddIcon /> Create Group</button>
                            </div>
                        </div>
                    ),
                }}
            // isLoading={true}
            />
        </React.Fragment>
    );
}   

export default withSnackbar(AddressBookTable);