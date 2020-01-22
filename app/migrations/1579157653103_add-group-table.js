exports.shorthands = undefined;

exports.up = pgm => {
	pgm.createTable("groupcontacts", {
		id: {
			type: "serial",
			primaryKey: true
		},
		userid: {
			type: "integer",
			notNull: true,
			references: "users"
		},
		groupname: {
			type: "text",
			notNull: true
		}
	});
};

exports.down = pgm => {};
