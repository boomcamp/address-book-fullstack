/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("contacts", {
    id: {
      type: "serial",
      primaryKey: true
    },
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"' // this is how we associate a profile with a specific user.
    },
    firstname: {
      type: "text",
      notNull: true
    },
    lastname: {
      type: "text",
      notNull: true
    },
    home_phone: {
      type: "text",
      notNull: true
    },
    mobile_phone: {
      type: "text",
      notNull: true
    },
    work_phone: {
      type: "text",
      notNull: true
    },
    email: {
      type: "text",
      notNull: true
    },
    city: {
      type: "text",
      notNull: true
    },
    state_or_province: {
      type: "text",
      notNull: true
    },
    postal_code: {
      type: "text",
      notNull: true
    },
    country: {
      type: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {};
