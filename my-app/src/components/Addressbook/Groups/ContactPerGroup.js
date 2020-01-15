import React from 'react';
import MaterialTable from 'material-table';

export default function ContactPerGroup(props) {
	const [state, setState] = React.useState({
		columns: [
			{ title: 'First Name', field: 'firstname' },
			{ title: 'Last Name', field: 'lastname' },
			{ title: 'Mobile Phone', field: 'mobile_phone' }
		],
		data: [
			{
				firstname: 'Joven',
				lastname: 'Bandagosa',
				mobile_phone: '09878765453'
			},
			{ firstname: 'Delfin', lastname: 'Danas', mobile_phone: '09878765453' },
			{ firstname: 'Jaymard', lastname: 'Menor', mobile_phone: '09878765453' }
		]
	});
	return (
		<MaterialTable
			title={props.rowData.group_name}
			columns={state.columns}
			data={state.data}
			options={{
				search: true
			}}
			actions={[
				{
					icon: 'group_add',
					tooltip: 'Add Contacts',
					isFreeAction: true,
					onClick: event => alert('You want to add a new row')
				}
			]}
		/>
	);
}
