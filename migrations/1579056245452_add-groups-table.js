exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("groups", {
    id: {
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
    },
    group_date_created: {
      type: "text"
    }
  });
};

exports.down = pgm => {};
