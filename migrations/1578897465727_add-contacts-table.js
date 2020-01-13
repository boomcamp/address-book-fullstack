exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('contacts', {
		id: {
			type: 'serial',
			primaryKey: true
		},
		userId: {
			type: 'text',
			notNull: true
		},
		firstname: {
			type: 'text',
			notNull: true,
			required: true
		},
		lastname: {
			type: 'text',
			notNull: true
		},
		home_phone: {
			type: 'text',
			notNull: true
		},
		mobile_phone: {
			type: 'text',
			notNull: true
		},
		work_phone: {
			type: 'text',
			notNull: true
		},
		email: {
			type: 'text',
			notNull: true
		},
		city: {
			type: 'text',
			notNull: true
		},
		state_or_province: {
			type: 'text',
			notNull: true
		},
		postal_code: {
			type: 'integer',
			notNull: true
		},
		country: {
			type: 'text',
			notNull: true
		},
		date_created: {
			type: 'text',
			notNull: true
		}
	});
};

exports.down = pgm => {};
