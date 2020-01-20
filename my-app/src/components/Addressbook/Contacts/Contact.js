import React from 'react';
import MaterialTable from 'material-table';
import ContactData from './ContactData';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import CreateContact from './CreateContact';
import ViewAndEditContact from './ViewAndEditContact';
import RemoveContact from './RemoveContact';

export default function Contacts() {
	const [createModal, setCreateModal] = React.useState(false);
	const [viewModal, setViewModal] = React.useState(false);
	const [deleteModal, setDeleteModal] = React.useState(false);
	const [data, setData] = React.useState({});
	const [notif, setNotif] = React.useState(false);
	const [sort, setSort] = React.useState(true);
	const { state, setState } = ContactData(sort);
	const handleClose = () => {
		setNotif(false);
	};

	return (
		<React.Fragment>
			<MaterialTable
				// style={{ paddingLeft: '20px', paddingRight: '20px' }}
				title="Contacts"
				columns={state.columns}
				data={state.data}
				options={{
					// filtering: true,
					actionsColumnIndex: -1,
					selection: true,
					actionsCellStyle: {
						width: 1,
						maxWidth: 1
					}
				}}
				actions={[
					{
						icon: 'add',
						tooltip: 'Add User',
						isFreeAction: true,
						onClick: event => setCreateModal(true)
					},
					{
						icon: sort ? 'A' : 'Z',
						tooltip: sort ? 'A-Z' : 'Z',
						isFreeAction: true,
						onClick: event => {
							setSort(!sort);
						}
					},
					{
						tooltip: 'Remove All Selected Users',
						icon: 'delete',
						onClick: (evt, data) => {
							console.log('You want to delete ' + data.length + ' rows');
							setData(data);
							setDeleteModal(true);
						}
					}
				]}
				onRowClick={(event, rowData, togglePanel) => {
					setData(rowData);
					setViewModal(true);
				}}
			/>
			<CreateContact
				createModal={createModal}
				setState={setState}
				setNotif={setNotif}
			/>
			<ViewAndEditContact
				data={data}
				setData={setData}
				modal={viewModal}
				setModal={setViewModal}
				setNotif={setNotif}
			/>
			<RemoveContact
				data={data}
				modal={deleteModal}
				setModal={setDeleteModal}
				setNotif={setNotif}
			/>
			<Snackbar
				open={notif}
				autoHideDuration={2000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<Alert onClose={handleClose} severity={'success'}>
					Successfully created!
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
}

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
