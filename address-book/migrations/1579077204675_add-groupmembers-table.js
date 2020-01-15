/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("groupmembers", {
    id: {
      type: "serial",
      primaryKey: true
    },
    groupid: {
      type: "integer",
      notNull: true,
      references: '"groupcontacts"'
    },
    contactid: {
      type: "integer",
      notNull: true,
      references: '"contacts"'
    }
  });
};

exports.down = pgm => {};
