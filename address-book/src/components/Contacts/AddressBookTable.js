import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '../tools/Table'

export default function AddressBookTable() {
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

    return (
        <React.Fragment>
            <Table 
                state={state}
                setStateFn={ (oldData) =>
                    setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                    })
                }
                createFn={ (newData) =>
                    setState(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                    })
                }
                updateFn={ (oldData, newData) =>
                    setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                    })
                }
            />
        </React.Fragment>
    );
}