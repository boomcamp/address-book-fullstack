exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable('members', {
		id: {
			type: 'serial',
			primaryKey: true
		},
		userid: {
			type: 'integer',
			notNull: true,
			references: '"users"'
		},
		groupid: {
			type: 'integer',
			notNull: true,
			references: '"groups"',
			onDelete: 'cascade'
		},
		contactid: {
			type: 'integer',
			notNull: true,
			references: '"contacts"',
			onDelete: 'cascade'
		}
	});
};

exports.down = pgm => {};
