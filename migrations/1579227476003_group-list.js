/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("grouplist", {
    groupId: {
      type: "integer",
      notNull: true,
      references: '"groups"'
    },
    contactId: {
      type: "integer",
      notNull: true,
      refrences: '"contacts"'
    }
  });
};

exports.down = pgm => {};
