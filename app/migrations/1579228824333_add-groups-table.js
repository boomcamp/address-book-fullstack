exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("contactgroup", {
    id: {
      type: "serial",
      primaryKey: true
    },
    userid: {
      type: "text",
      notNull: true
    },
    group_name: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {};
