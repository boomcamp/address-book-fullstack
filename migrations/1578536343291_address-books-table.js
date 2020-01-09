exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("book", {
    id: {
      type: "serial",
      primaryKey: true
    },
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"'
    }
  });
};

exports.down = pgm => {};
