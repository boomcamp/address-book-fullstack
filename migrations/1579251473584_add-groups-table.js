exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("groups", {
    group_id: {
      type: "serial",
      primaryKey: true
    },
    user_id: {
      type: "integer",
      notNull: true
    },
    group_name: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {};
