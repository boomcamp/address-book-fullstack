import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TemplateMainPage from './tools/TemplateMainPage'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Paper from '@material-ui/core/Paper';

import Table from './tools/Table';

    // STYLES
    // const style = {
    //     container: {
    //         padding: `20px 50px 50px 50px`,
    //         border: '1px solid lightgrey',
    //         boxShadow: '4px 5px 5px 1px rgba(0,0,0,0.14)',
    //         width: '80%',
    //         // height: 'auto',
    //         margin: '0 auto',
    //     },
    // }

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`group-contact-tabpanel-${index}`}
            aria-labelledby={`group-contact-tab-${index}`}
            {...other}
        >
            {children}
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
            method: `get`,
            url: `/api/groups`,
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        .then(res => {
            setGroup(res.data)
        })
        .catch(err => {
            console.log(err)
        })

        return () => { };
    }, [])

    return (
        <TemplateMainPage>
            {/* <Paper style={style.container}> */}
                <h1>Group Contacts</h1>

                <AppBar position="static" style={{backgroundColor:`#e8e8e8`, color:`black`}}>
                    <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="group-contact" >
                        { group.map((x,i) => (
                            <Tab label={x.groupName} {...a11yProps(i)} key={i}/>
                          ))
                        }
                    </Tabs>
                </AppBar>

                {
                    group.map((x,i) => (
                        <TabPanel value={value} index={i}>
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
                        </TabPanel> 
                    ))
                }
            {/* </Paper> */}
        </TemplateMainPage>
    );
}
