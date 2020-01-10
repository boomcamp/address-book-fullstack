import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';

import PopUpModal from '../tools/PopUpModal'
import CreateContactForm from './CreateContactForm'
import UpdateContactForm from './UpdateContactForm'

export default function AddressBookTable() {
    const [open, setOpen] = useState({
        create: false,
        update: {
            openModal: false,
            row: {}
        },
    });
    const [state, setState] = useState({
        columns: [
            { title: 'Firstname', field: 'firstName' },
            { title: 'Lastname', field: 'lastName' },
            { title: 'Phone Number', field: 'mobilePhone' },
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

    const deleteRow = (oldData) => {
        axios.delete('/api/contacts/' + oldData.id, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) })
    }
    return (
        <React.Fragment>
            {/* MODAL FOR CREATE */}
            <PopUpModal
                open={open.create}
                closeFn={() => setOpen({...open, create: false})}
            >
                <CreateContactForm closeFn={() => setOpen({...open, create: false})} />
            </PopUpModal>

            {/* MODAL FOR UPDATE */}
            <PopUpModal
                open={open.update.openModal}
                closeFn={() => setOpen({...open, update: {openModal: false} })}
            >
                <UpdateContactForm row={open.update.row} closeFn={() => setOpen({...open, update: {openModal: false} })} />
            </PopUpModal>
        
            <MaterialTable
                title="Contact List"
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
                        onClick: () => setOpen({...open, create: true})
                        
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit Contact',
                        onClick: (event, rowData) => setOpen({...open, update: {openModal: true, row: rowData} })
                      }
                ]}
                options={{
                    actionsColumnIndex: -1,
                }}

                // isLoading={true}
            />
        </React.Fragment>
    );
}