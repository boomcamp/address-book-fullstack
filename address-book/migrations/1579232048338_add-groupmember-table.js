/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("groupmember", {
    id: {
      type: "serial",
      primaryKey: true
    },
    groupid: {
      type: "integer",
      notNull: true
    },
    contactid: {
      type: "integer",
      notNull: true
    }
  });
};

exports.down = pgm => {};
