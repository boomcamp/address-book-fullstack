exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("addressbook", {
    id: {
      type: "serial",
      primaryKey: true
    },
    first_name: {
      type: "text",
      notNull: true
    },
    last_name: {
      type: "text",
      notNull: true
    },
    email: {
      type: "text",
      notNull: true
    },
    address: {
      type: "text",
      notNull: true
    },
    city: {
      type: "text",
      notNull: true
    },
    postal_code: {
      type: "integer",
      notNull: true
    },
    state_or_province: {
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
