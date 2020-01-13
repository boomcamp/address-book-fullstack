exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('groups', {
		id: {
			type: 'serial',
			primaryKey: true
		},
		userId: {
			type: 'text',
			notNull: true
		},
		group_name: {
			type: 'text',
			notNull: true,
			required: true
		},
		date_created: {
			type: 'text',
			notNull: true
		}
	});
};

exports.down = pgm => {};
