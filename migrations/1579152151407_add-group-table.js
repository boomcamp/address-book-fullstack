/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("groups", {
    id: { type: "serial", primaryKey: true },
    userId: {
      type: "integer",
      notNull: true,
      refrences: '"users"'
    },
    groupName: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {};
