import React, { useEffect, useState } from 'react';
import Axios from 'axios';

import {
	makeStyles,
	Grid,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Paper
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import EmailIcon from '@material-ui/icons/Email';
import UserDetails from './UserDetails';

export default function Users() {
	const classes = useStyles();
	const [data, setData] = useState({});
	useEffect(() => {
		Axios.get(`/api/users/${localStorage.getItem('id')}`, {
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
			}
		})
			.then(res => setData(res.data))
			.catch(err => console.log(err));
	}, []);

	return (
		<Grid container spacing={2} justify="flex-start">
			<Grid item xs={12} lg={3}>
				<Paper>
					<List className={classes.root}>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<AccountCircleIcon />
								</Avatar>
							</ListItemAvatar>

							<ListItemText primary={<h3>{`Welcome ${data.firstname}!`}</h3>} />
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<PermContactCalendarIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Username" secondary={data.username} />
						</ListItem>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<EmailIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Email" secondary={data.email} />
						</ListItem>
					</List>
				</Paper>
			</Grid>
			<Grid item xs={12} lg={9}>
				<Paper style={{ padding: 20 }}>
					<UserDetails data={data} />
				</Paper>
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
}));
