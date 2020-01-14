import React, { useState } from 'react'
import axios from 'axios'
import MaterialTable, { MTableToolbar } from 'material-table';
import { withSnackbar } from 'notistack';
// import GroupAddIcon from '@material-ui/icons/GroupAdd';

import PopUpModal from './PopUpModal'
import CreateContactForm from '../Contacts/CreateContactForm'
import UpdateContactForm from '../Contacts/UpdateContactForm'
import DetailedContact from '../Contacts/DetailedContact'

// const btnStyle = {
//     display: `flex`,
//     alignItems: `center`,
//     border: `none`,
//     color: `white`,
//     backgroundColor: `#4c6572`,
//     cursor: `pointer`,
//     borderRadius: `5px`,
//     padding: `10px`,
//     margin: `8px`,
// }

function Table({ state, setStateFn, createFn, updateFn, enqueueSnackbar}) {
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
            enqueueSnackbar('Successfully Created', { variant: 'success', autoHideDuration: 1000, })
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
        axios.delete('/api/contacts/' + oldData.id, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(res)
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
                <CreateContactForm createRowFn={createRow} closeFn={() => setOpen({ ...open, create: false })} />
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

            {/* <PopUpModal
                open={open.group}
                closeFn={() => setOpen({ ...open, group: false })}
            >
                <h1>CODE GOES HERE... </h1>
            </PopUpModal> */}


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
                // components={{
                //     Toolbar: props => (
                //         <div>
                //             <MTableToolbar {...props} />
                //             <div style={{ padding: '0px 10px' }}>
                //                 <button style={btnStyle} onClick={() => setOpen({ ...open, group: true })}><GroupAddIcon /> &nbsp;Create Group</button>
                //             </div>
                //         </div>
                //     ),
                // }}
                // isLoading={true}
            />
        </React.Fragment>
    )
}

export default withSnackbar(Table);