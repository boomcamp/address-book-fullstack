/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("groups", {
    id: {
      type: "serial",
      primaryKey: true
    },
    userid: {
      type: "integer",
      notNull: true,
      references: '"users"'
    },

    groupname: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {};
