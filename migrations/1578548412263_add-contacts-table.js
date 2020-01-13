/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("contacts", {
    id: {
      type: "serial",
      primaryKey: true
    },
    firstName: {
      type: "text",
      notNull: true
    },
    lastName: {
      type: "text",
      notNull: true
    },
    mobile_phone: {
      type: "text"
    },
    email: {
      type: "text",
      notNull: true
    },
    city: {
      type: "text"
    },
    state: {
      type: "text"
    },
    postalCode: {
      type: "text"
    },
    country: {
      type: "text"
    },
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"'
    },
    groupId: {
      type: "integer"
    }
  });
};

exports.down = pgm => {};
