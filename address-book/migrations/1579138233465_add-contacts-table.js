/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("contacts", {
    id: {
      type: "serial",
      primaryKey: true
    },
    firstname: {
      type: "text",
      notNull: true
    },
    lastname: {
      type: "text"
    },
    home_phone: {
      type: "varchar"
    },
    mobile_phone: {
      type: "varchar"
    },
    work_phone: {
      type: "varchar"
    },
    email: {
      type: "text"
    },
    city: {
      type: "text"
    },
    state_or_province: {
      type: "text"
    },
    postal_code: {
      type: "integer"
    },
    country: {
      type: "text"
    },
    userid: {
      type: "integer"
    }
  });
};

exports.down = pgm => {};
