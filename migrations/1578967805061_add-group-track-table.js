/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("groups_track", {
    id: { type: "serial", primaryKey: true },
    groupid: {
      type: "integer",
      notNull: true,
      references: "groups"
    },
    contactid: {
      type: "integer",
      notNull: true,
      references: "contacts"
    },
    contact_added_date: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {};
