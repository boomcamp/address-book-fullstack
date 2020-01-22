import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableActions from '../tools/TableActions'

import Table from '../tools/Table'

    const contactLogoStyle = {
        background:`#4c6572`, 
        width:`40px`, 
        height:`40px`, 
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
            setState({ ...state, data: res.data, sort:sort})
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [state, setState] = useState({
        columns: [
            // { title: "#", field: `tableData.id` },
            { title: 'Name', field: 'first_name', cellStyle:{padding:`0 0 0 15px`},
                render: (rowData) => (
                    <div style={{display:`flex`, alignItems:`center`}}>
                        <span style={contactLogoStyle}>{rowData.first_name[0]}</span> 
                        <p style={{fontFamily:`Helvetica`, padding:`10px`, margin:`0`}}>{rowData.first_name} {rowData.last_name}</p>
                    </div>
                )
            },
            { title: '', field: 'last_name', headerStyle:{display:`none`}, cellStyle:{display:`none`}   },
            { title: 'Home Phone', field: 'home_phone', hidden: (windowSize<426)?true:false},
            { title: 'Mobile Phone', field: 'mobile_phone',  hidden: (windowSize<426)?true:false},
            { title: 'Work Phone', field: 'work_phone', hidden: (windowSize<426)?true:false},
            { title: 'Actions', field:'', cellStyle: {margin:`0`, width:`10%`}, headerStyle:{margin:`0`, width:`10%`},
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
        window.addEventListener("resize", setWindowSize(window.innerWidth));

        return () => {window.addEventListener("resize", null); };
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