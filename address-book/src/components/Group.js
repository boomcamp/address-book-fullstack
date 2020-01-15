import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TemplateMainPage from './tools/TemplateMainPage'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

import fetchGroupContact from './tools/fetchGroupContact'
import Table from './tools/Table';

function TabPanel({value, index, id, groupObj, updateGroupListFn, ...other }) {
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
        axios({
            method: 'get',
            url: '/api/groups/' + id,
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => setState({...state, data: res.data}) )
        .catch(err => console.log(err) )

        return () => {  };
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
                // isGroup={true}
                // addGroupId={id}
                groupObj={groupObj}
                updateGroupListFn={updateGroupListFn}
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
   
    useEffect(() => {
        let isCancelled = false;

        fetchGroupContact(`/api/groups?userId=` + sessionStorage.getItem('userId'))
        .then(res => {
            if(!isCancelled)
                setGroup(res)
        })

        return () => { isCancelled = true};
    }, [])
console.log(group)
    return (
        <TemplateMainPage>
            <h1>Group Contacts</h1>
            <AppBar position="static" style={{backgroundColor:`#e8e8e8`, color:`black`}}>
                <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="group-contact" >
                    { group.map((x,i) => (
                        <Tab label={x.groupName} {...a11yProps(i)} key={i}/>
                        ))
                    }
                </Tabs>
            </AppBar>
            
            {(group.length == 0) ? 
                <Paper style={{border: `1px solid #e8e8e8`}}>
                    <h2 style={{textAlign:`center`, opacity:`0.5`, height:`50vh`, margin:`100px 0`}}><i>There are no Available Groups...</i></h2>
                </Paper> : 
                group.map((x,i) => (
                    <TabPanel value={value} index={i} key={i} id={x.id} groupObj={x} updateGroupListFn={(data) => setGroup(data)}/>
                )) }
        </TemplateMainPage>
    );
}
