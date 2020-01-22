/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("grouplist", {
    groupid: {
      type: "integer",
      notNull: true,
      references: '"groups"'
    },
    contactid: {
      type: "integer",
      notNull: true,
      refrences: '"contacts"'
    }
  });
};

exports.down = pgm => {};
