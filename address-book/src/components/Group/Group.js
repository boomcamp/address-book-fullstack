import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TemplateMainPage from '../tools/TemplateMainPage'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GroupIcon from '@material-ui/icons/Group';

import TableActions from '../tools/TableActions'
import fetchGroupContact from '../tools/js/fetchGroupContact'
import Table from '../tools/Table';

const contactLogoStyle = {
    background: `#4c6572`,
    width: `40px`,
    height: `40px`,
    textAlign: `center`,
    borderRadius: `50%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    color: `white`,
    textTransform: `uppercase`
}

function TabPanel({ fetchGroupFn, value, index, groupObj, updateGroupListFn, ...other }) {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [state, setState] = useState({
        columns: [
            // { title: "#", field: `tableData.id` },
            {
                title: 'Name', field: 'first_name', cellStyle: { padding: `0 0 0 15px` },
                render: (rowData) => (
                    <div style={{ display: `flex`, alignItems: `center` }}>
                        <span style={contactLogoStyle}>{rowData.first_name[0]}</span>
                        <p style={{ fontFamily: `Helvetica`, padding: `10px` }}>{rowData.first_name} {rowData.last_name}</p>
                    </div>
                )
            },
            { title: '', field: 'last_name', headerStyle: { display: `none` }, cellStyle: { display: `none` } },
            { title: 'Home Phone', field: 'home_phone', hidden: (windowSize < 426) ? true : false },
            { title: 'Mobile Phone', field: 'mobile_phone', hidden: (windowSize < 426) ? true : false },
            { title: 'Work Phone', field: 'work_phone', hidden: (windowSize < 426) ? true : false },
            {
                title: 'Actions', field: '', cellStyle: { margin: `0`, width: `10%` }, headerStyle: { margin: `0`, width: `10%` },
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
                        updateTableFn={
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

    const fetchContact = (sort) => {
        axios({
            method: 'get',
            url: `/api/groups/${groupObj.id}${(sort) ? `?sortLastname=${sort}` : ``}`,
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => {
                setState(prevState => { return { ...prevState, data: res.data, sort: sort } })
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchContact();
        window.addEventListener("resize", handleResize);

        return () => { window.addEventListener("resize", null); };
    }, [])

    const handleResize = (WindowSize, event) => {
        setWindowSize(window.innerWidth)
    }

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            <Table
                groupObj={groupObj}
                updateGroupListFn={updateGroupListFn}
                state={state}
                updateTableFn={fetchContact}
                setStateFn={(oldData) =>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        // flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        // height: 224,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

export default function Group() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [group, setGroup] = useState([])

    const fetchGroup = (isCancelled) => {
        fetchGroupContact(`/api/groups?userId=` + sessionStorage.getItem('userId'))
            .then(res => {
                if(!isCancelled)
                setGroup(res)
                // console.log(res)
            })
    }

    useEffect(() => {
        let isCancelled = false;
        fetchGroup(isCancelled);
        return () => { isCancelled = true };
    }, [])

    return (
        <TemplateMainPage>
            {/* <a href="#" style={{textDecoration:`none`}}>Contacts </a> > <a href="#" style={{textDecoration:`none`}}>Group Contacts</a> */}
            <div className={classes.root}>
                <div>
                    {(group.length!==0)&&<h3 style={{textAlign: `center`}}>{/* <GroupIcon /> */} Group Contacts</h3>}
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={(event, newValue) => setValue(newValue)}
                        aria-label="Vertical tabs"
                        className={classes.tabs}
                    >
                        {group.map((x, i) => (
                            <Tab label={x.group_name} {...a11yProps(i)} key={i} />
                        ))}
                    </Tabs>
                </div>

                {(group.length === 0) ?
                    <h2 style={{ textAlign: `center`, opacity: `0.5`, height: `50vh`, margin: `100px 0`, width:`100%`}}><i>There are no Available Groups...</i></h2>
                    : group.map((x, i) => (
                        <TabPanel
                            style={{width:`90%`}}
                            fetchGroupFn={fetchGroup}
                            value={value}
                            index={i}
                            key={i}
                            id={x.id} groupObj={x} updateGroupListFn={(data) => setGroup(data)} />
                    ))}
            </div>
        </TemplateMainPage>
    );
}