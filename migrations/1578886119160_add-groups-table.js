/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("groups", {
    id: {
      type: "serial",
      primaryKey: true
    },
    groupName: {
      type: "text",
      notNull: true
    },
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"'
    },
    dateCreated: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {};
