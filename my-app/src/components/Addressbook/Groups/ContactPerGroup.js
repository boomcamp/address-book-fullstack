import React, { useState, useEffect } from 'react';

import {
	makeStyles,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Button,
	Typography
} from '@material-ui/core';

import GroupAddIcon from '@material-ui/icons/GroupAdd';

import axios from 'axios';
import AddMembers from './AddMember';
import RemoveMember from './RemoveMember';
import ViewMember from './ViewMember';

export default function ContactPerGroup(props) {
	const classes = useStyles();
	const userId = localStorage.getItem('id');
	const { rowData } = props;

	const [members, setMembers] = useState([]);
	const [contacts, setContacts] = useState([]);

	const [data, setData] = React.useState({});
	const [modal, setModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [viewModal, setViewModal] = React.useState(false);

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
	}, [deleteModal, userId, rowData.id]);

	const handleModal = () => {
		setModal(true);
	};
	return (
		<React.Fragment>
			<div className={classes.title}>
				<h2>{rowData.group_name}</h2>
				<GroupAddIcon onClick={handleModal} style={{ cursor: 'pointer' }} />
			</div>
			<div className={classes.content}>
				{Object.keys(members).length !== 0 ? (
					contacts.map((contact, index) => {
						return members.map(member => {
							if (contact.id === member.contactid) {
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
											<Button
												size="small"
												color="primary"
												onClick={() => {
													setData(member.id);
													setDeleteModal(true);
												}}
											>
												Remove
											</Button>
											<Button
												size="small"
												color="primary"
												onClick={() => {
													setData(contacts[index]);
													setViewModal(true);
												}}
											>
												View
											</Button>
										</CardActions>
									</Card>
								);
							}
							return null;
						});
					})
				) : (
					<h2>No contacts</h2>
				)}
			</div>
			<AddMembers
				rowData={rowData}
				modal={modal}
				setModal={setModal}
				member={members}
				setMembers={setMembers}
			/>
			<RemoveMember
				data={data}
				modal={deleteModal}
				setModal={setDeleteModal}
				member={members}
				setMembers={setMembers}
			/>
			<ViewMember
				data={data}
				setData={setData}
				modal={viewModal}
				setModal={setViewModal}
			/>
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
