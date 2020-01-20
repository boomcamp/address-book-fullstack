import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import axios from 'axios';

export default function ContactPerGroup(props) {
	const classes = useStyles();
	const userId = localStorage.getItem('id');
	const { rowData } = props;
	const [members, setMembers] = useState([]);
	const [contacts, setContacts] = useState([]);
	useEffect(() => {
		axios
			.get(`/api/contacts/userId-${userId}?value=ASC`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
				}
			})
			.then(res => {
				setContacts(res.data);
			})
			.catch(err => console.log(err));
		axios
			.get(`/api/members/user-${userId}/group-${rowData.id}`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
				}
			})
			.then(res => {
				setMembers(res.data);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<React.Fragment>
			<div className={classes.title}>
				<h2>{rowData.group_name}</h2>
				<GroupAddIcon />
			</div>
			<div className={classes.content}>
				{Object.keys(members).length !== 0 ? (
					contacts.map((contact, index) => {
						return members.map(member => {
							if (contact.id === parseInt(member.contactid)) {
								return (
									<Card className={classes.card} key={index}>
										<CardActionArea>
											<CardContent>
												<Typography gutterBottom variant="h5" component="h2">
													{`${contact.firstname} ${contact.lastname}`}
												</Typography>
												<Typography
													variant="body2"
													color="textSecondary"
													component="p"
												>
													{`Phone: 0${contact.mobile_phone}`}
												</Typography>
											</CardContent>
										</CardActionArea>
										<CardActions>
											<Button size="small" color="primary">
												Remove
											</Button>
											<Button size="small" color="primary">
												View
											</Button>
										</CardActions>
									</Card>
								);
							}
						});
					})
				) : (
					<h2>No contacts</h2>
				)}
			</div>
		</React.Fragment>
	);
}

const useStyles = makeStyles({
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		flexFlow: 'row wrap',
		padding: '10px 30px'
	},
	content: {
		display: 'flex',
		justifyContent: 'center',
		flexFlow: 'row wrap'
	},
	card: {
		maxWidth: 550,
		margin: 20,
		width: 250
	},
	media: {
		height: 140
	}
});
