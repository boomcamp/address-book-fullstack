import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableActions from '../tools/TableActions'

import Table from '../tools/Table'

    const contactLogoStyle = {
        background:`#4c6572`, 
        width:`6vh`, 
        height:`6vh`, 
        textAlign:`center`, 
        borderRadius:`50%`, 
        display:`flex`, 
        alignItems:`center`, 
        justifyContent:`center`, 
        color:`white`, 
        textTransform:`uppercase`
    }

export default function AddressBookTable() {
    const updateTable = (sort) => {
        axios
        .get(`/api/contacts/${sessionStorage.getItem('userId')}${(sort)?`?sortLastname=${sort}`: ``}`, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => {
            // console.log(res.data)
            setState({ ...state, data: res.data, sort:{sort}})
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const [state, setState] = useState({
        columns: [
            // { title: "#", field: `tableData.id` },
            { title: 'Name', field: 'first_name', cellStyle:{padding:`0 0 0 15px`},
                render: (rowData) => (
                    <div style={{display:`flex`, alignItems:`center`}}>
                        <span style={contactLogoStyle}>{rowData.first_name[0]}</span> 
                        <p style={{fontFamily:`Helvetica`, padding:`10px`}}>{rowData.first_name} {rowData.last_name}</p>
                    </div>
                )
            },
            { title: '', field: 'last_name', headerStyle:{display:`none`}, cellStyle:{display:`none`}   },
            { title: 'Home Phone', field: 'home_phone' },
            { title: 'Mobile Phone', field: 'mobile_phone' },
            { title: 'Work Phone', field: 'work_phone' },
            { title: 'Actions', field:'', cellStyle: {padding:`0`}, headerStyle:{padding:`0`},
                render: (rowData) => (
                   <TableActions 
                    rowData={rowData}
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