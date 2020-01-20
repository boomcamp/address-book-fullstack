exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable("groupmembers", {
		id: {
			type: "serial",
			primaryKey: true
		},
		groupid: {
			type: "integer",
			notNull: true
		},
		contactid: {
			type: "integer",
			notNull: true
		}
	});
};

exports.down = pgm => {};
