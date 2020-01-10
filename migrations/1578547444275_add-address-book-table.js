exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("address_book", {
    id: {
      type: "serial",
      primaryKey: true
    },
    userId: {
      type: "integer",
      notNull: true
    },
    contactId: {
      type: "integer",
      notNull: true
    }
  });
};

exports.down = pgm => {};
