import React, { useState } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import GroupIcon from '@material-ui/icons/Group';

export default function IconList(props) {
	const [selectedIndex, setSelectedIndex] = useState('contact');

	const handleListItemClick = index => {
		setSelectedIndex(index);
		props.setPage(index);
	};

	return (
		<List component="nav" aria-label="main mailbox folders">
			<ListItem
				button
				// selected={selectedIndex === 'user'}
				// onClick={() => handleListItemClick('user')}
			>
				<ListItemIcon>
					<AccountCircleIcon />
				</ListItemIcon>
				<ListItemText primary={`Hi ${localStorage.getItem('name')}!`} />
			</ListItem>
			<ListItem
				button
				selected={selectedIndex === 'contact'}
				onClick={() => handleListItemClick('contact')}
			>
				<ListItemIcon>
					<PermContactCalendarIcon />
				</ListItemIcon>
				<ListItemText primary="Contacts" />
			</ListItem>
			<ListItem
				button
				selected={selectedIndex === 'group'}
				onClick={() => handleListItemClick('group')}
			>
				<ListItemIcon>
					<GroupIcon />
				</ListItemIcon>
				<ListItemText primary="Groups" />
			</ListItem>
		</List>
	);
}
