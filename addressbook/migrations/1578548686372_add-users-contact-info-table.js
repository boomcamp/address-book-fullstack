/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("contact_info", {
    id: {
      type: "serial",
      primaryKey: true
    },
    lastname: {
      type: "text"
    },
    firstname: {
      type: "text"
    },
    lastname: {
      type: "text"
    },
    home_phone: {
      type: "text"
    },
    mobile_phone: {
      type: "text"
    },
    work_phone: {
      type: "text"
    },
    email: {
      type: "text"
    },
    city: {
      type: "text"
    },
    stae_or_province: {
      type: "text"
    },
    postal_code: {
      type: "integer"
    },
    country: {
      type: "text"
    },
    
  });
};

exports.down = pgm => {};
