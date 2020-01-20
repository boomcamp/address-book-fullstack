exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('members', {
		id: {
			type: 'serial',
			primaryKey: true
		},
		userid: {
			type: 'text',
			notNull: true
		},
		groupid: {
			type: 'text',
			notNull: true
		},
		contactid: {
			type: 'text',
			notNull: true
		}
	});
};

exports.down = pgm => {};
