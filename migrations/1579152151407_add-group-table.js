/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("group", {
    id: { type: "serial", primaryKey: true },
    contactId: {
      type: "integer",
      notNull: true,
      refrences: '"contacts"'
    },
    bookName: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {};
