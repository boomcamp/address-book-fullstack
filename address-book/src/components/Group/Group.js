import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TemplateMainPage from '../tools/TemplateMainPage'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import TableActions from '../tools/TableActions'
import fetchGroupContact from '../tools/fetchGroupContact'
import Table from '../tools/Table';

function TabPanel({ fetchGroupFn, value, index, groupObj, updateGroupListFn, ...other }) {
    const [state, setState] = useState({
        columns: [
            { title: "#", field: `tableData.id` },
            { title: 'Firstname', field: 'firstName' },
            { title: 'Lastname', field: 'lastName' },
            { title: 'Home Phone', field: 'homePhone' },
            { title: 'Mobile Phone', field: 'mobilePhone' },
            { title: 'Work Phone', field: 'workPhone' },
            { title: 'Actions', field: '', cellStyle: { margin: `0` }, headerStyle: { margin: `0` },
                render: (rowData) => (
                    <TableActions 
                        rowData={rowData}
                        setStateFn={(oldData) =>
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            })
                        }
                        updateFn={(oldData, newData) =>
                            setState(prevState => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                            })
                        }
                        updateStateFn={
                            fetchContact
                        }
                        groupObj={groupObj}
                        fetchGroupFn={fetchGroupFn}
                    />
                )
            }
        ],
        data: [],
    });

    const fetchContact = () => {
        axios({
            method: 'get',
            url: '/api/groups/' + groupObj.id,
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => setState(prevState => { return { ...prevState, data: res.data } }))
            .catch(err => console.log(err))

    }
    useEffect(() => {
        fetchContact();
        return () => { };
    }, [])

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`group-contact-tabpanel-${index}`}
            aria-labelledby={`group-contact-tab-${index}`}
            {...other}
        >
            <Table
                groupObj={groupObj}
                updateGroupListFn={updateGroupListFn}
                state={state}
                createFn={(newData) =>
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
            />
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `group-contact-tab-${index}`,
        'aria-controls': `group-contact-tabpanel-${index}`,
    };
}

export default function Group() {
    const [value, setValue] = useState(0);
    const [group, setGroup] = useState([])

    const fetchGroup = () => {
        fetchGroupContact(`/api/groups?userId=` + sessionStorage.getItem('userId'))
            .then(res => {
                // if(!isCancelled)
                setGroup(res)
            })
    }

    useEffect(() => {
        // let isCancelled = false;
        fetchGroup();
        return () => { /*isCancelled = true*/ };
    }, [])
    
    return (
        <TemplateMainPage>
            <h1>Group Contacts</h1>
            <AppBar position="static" style={{ backgroundColor: `#e7e8ea`, color: `black` }}>
                <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="group-contact" >
                    {group.map((x, i) => (
                        <Tab label={x.groupName} {...a11yProps(i)} key={i} />
                    ))
                    }
                </Tabs>
            </AppBar>

            {(group.length === 0) ?
                <Paper style={{ border: `1px solid #e8e8e8` }}>
                    <h2 style={{ textAlign: `center`, opacity: `0.5`, height: `50vh`, margin: `100px 0` }}><i>There are no Available Groups...</i></h2>
                </Paper> :
                group.map((x, i) => (
                    <TabPanel
                        fetchGroupFn={fetchGroup}
                        value={value}
                        index={i}
                        key={i}
                        id={x.id} groupObj={x} updateGroupListFn={(data) => setGroup(data)} />
                ))}
        </TemplateMainPage>
    );
}
