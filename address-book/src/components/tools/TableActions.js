import React, { useState } from 'react'
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { withSnackbar } from 'notistack';

import UpdateContactForm from '../Contacts/UpdateContactForm'
import PopUpModal from './PopUpModal'

function TableActions({ rowData, enqueueSnackbar, updateFn, updateTableFn, setStateFn, updateStateFn, groupObj, fetchGroupFn }) {
    const [update, setUpdate] = useState({
        openModal: false,
        row: {}
        ,
    });

    const updateRow = (oldData, newData) => {
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
                if (oldData) {
                    updateFn(oldData, newData)
                }
            }, 600);
        }).then(res => {
            // updateTableFn()
            if (groupObj) {
                updateStateFn()
                fetchGroupFn()
            }
            enqueueSnackbar('Successfully Updated', { variant: 'success', autoHideDuration: 1000, })
        })
    }

    const deleteRow = (oldData) => {
        if (!groupObj) {
            axios
                .delete('/api/contacts/' + oldData.id, {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                })
                .then(res => {
                    enqueueSnackbar('Successfully Deleted', { variant: 'success', autoHideDuration: 1000, })
                })
                .catch(err => { console.log(err) })
        }

        if (groupObj) {
            axios
                .put('/api/groups/' + oldData.id, {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    }
                })
                .then(res => {
                    enqueueSnackbar('Successfully Removed from the group', { variant: 'success', autoHideDuration: 1500, })
                })
                .catch(err => { console.log(err) })
        }
    }

    return (
        <>
            <PopUpModal
                onClick={(e) => e.stopPropagation()}
                open={update.openModal}
                closeFn={(e) => {
                    e.stopPropagation();
                    setUpdate({ ...update, openModal: false })
                }}
            >
                <UpdateContactForm
                    updateRowFn={updateRow}
                    row={update.row}
                    closeFn={() => {
                        setUpdate({ ...update, openModal: false })
                    }} />
            </PopUpModal>

            <div style={{ display: `flex`, justifyContent: `space-around`, width: `80px` }}>
                <EditIcon onClick={(e) => {
                    e.stopPropagation()
                    setUpdate({ ...update, openModal: true, row: rowData })
                }} />

                <DeleteIcon style={{ color: `red` }}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm((!groupObj) ? 'Are you sure to delete this Contact?' : 'Are you sure you want to remove this from the Group?')) {
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    setStateFn(rowData);
                                }, 600);
                            }).then(deleteRow(rowData))
                        }
                    }} />
            </div>
        </>
    )
}

export default withSnackbar(TableActions);