/* eslint-disable camelcase */

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
      references: '"users"'
    },
    contactid: {
      type: "integer",
      notNull: true,
      references: '"contacts"'
    },
    groupid: {
      type: "integer",
      notNull: true,
      references: '"groups"'
    }
  });
};

exports.down = pgm => {};
