/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("groups", {
    id: {
      type: "serial",
      primaryKey: true
    },
    user_id: {
      type: "integer",
      notNull: true,
      references: '"users"'
    },
    group_name: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {};
