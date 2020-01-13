/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("addresBook", {
    id: {
      type: "serial",
      primaryKey: true
    },
    userid: {
      type: "integer",
      notNull: true,
      references: "users"
    },
    contactid: {
      type: "integer",
      notNull: true,
      references: "contacts"
    },
  });
};

exports.down = pgm => {};
