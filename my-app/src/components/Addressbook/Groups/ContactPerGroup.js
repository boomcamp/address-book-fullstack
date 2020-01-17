import React from 'react';
import MaterialTable from 'material-table';

export default function ContactPerGroup(props) {
	const [state] = React.useState({
		columns: [
			{ title: 'Name', field: 'name' },
			{ title: 'Number', field: 'mobile_phone', filtering: false }
		],
		data: [
			{ name: 'Joven Bandagosa', mobile_phone: '09878765453' },
			{ name: 'Delfin Danas', mobile_phone: '09878765453' },
			{ name: 'Jaymard Menor', mobile_phone: '09878765453' }
		]
	});
	return (
		<MaterialTable
			title={props.rowData.group_name}
			columns={state.columns}
			data={state.data}
			options={{
				search: false,
				filtering: false,
				selection: true
			}}
			actions={[
				{
					icon: 'group_add',
					tooltip: 'Add Contacts',
					isFreeAction: true,
					onClick: event => alert('You want to add a new row')
				},
				,
				{
					tooltip: 'Remove All Selected Users',
					icon: 'delete',
					onClick: (evt, data) => {
						alert('You want to delete ' + data.length + ' rows');
					}
				}
			]}
		/>
	);
}
