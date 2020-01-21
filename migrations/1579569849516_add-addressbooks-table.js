exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('addressbooks', {
		id: {
			type: 'serial',
			primaryKey: true
		},
		userid: {
			type: 'integer',
			notNull: true,
			references: '"users"'
		},
		home_phone: {
			type: 'text'
		},
		mobile_phone: {
			type: 'text'
		},
		work_phone: {
			type: 'text'
		},
		email: {
			type: 'text'
		},
		city: {
			type: 'text'
		},
		state_or_province: {
			type: 'text'
		},
		postal_code: {
			type: 'text'
		},
		country: {
			type: 'text'
		}
	});
};

exports.down = pgm => {};
