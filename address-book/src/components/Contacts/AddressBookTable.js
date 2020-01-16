import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableActions from '../tools/TableActions'


import Table from '../tools/Table'

export default function AddressBookTable() {
    const updateTable = () => {
        axios
        .get('/api/contacts/' + sessionStorage.getItem('userId'), {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => {
            // console.log(res.data)
            setState(prevState => { return { ...prevState, data: res.data } })
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const [state, setState] = useState({
        columns: [
            { title: "#", field: `tableData.id` },
            { title: 'Firstname', field: 'firstName' },
            { title: 'Lastname', field: 'lastName' },
            { title: 'Home Phone', field: 'homePhone' },
            { title: 'Mobile Phone', field: 'mobilePhone' },
            { title: 'Work Phone', field: 'workPhone' },
            { title: 'Actions', field:'', cellStyle: {margin:`0`}, headerStyle:{margin:`0`},
                render: (rowData) => (
                   <TableActions 
                   rowData={rowData}
                   updateFn={ (oldData, newData, e) =>{
                        console.log(e)
                        setState(prevState => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                        })
                    }}
                    updateTableFn={updateTable}
                    setStateFn={ (oldData) =>
                        setState(prevState => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                        })
                    }
                />
                )
            }
        ],
        data: [],
    });

    useEffect(() => {
        updateTable();
        return () => { };
    }, [])

    return (
        <React.Fragment>
            <Table 
                state={state}
                createFn={ (newData) =>
                    setState(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                    })
                }
                setStateFn={ (oldData) =>
                    setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                    })
                }
                updateTableFn={updateTable}
            />
        </React.Fragment>
    );
}