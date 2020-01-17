exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable("groupmembers", {
		id: {
			type: "serial",
			primaryKey: true
		},
		groupId: {
			type: "integer",
			notNull: true,
			references: '"groupcontacts"'
		},
		contactId: {
			type: "integer",
			notNull: true,
			references: '"contacts"'
		}
	});
};
exports.down = pgm => {};
