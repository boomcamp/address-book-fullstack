exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("groupContacts", {
    id: {
      type: "serial",
      primaryKey: true
    },
    user_id: {
      type: "integer",
      notNull: true,
      reference: "users"
    },
    group_id: {
      type: "integer",
      notNull: true,
      reference: "groups"
    },
    contact_id: {
      type: "integer",
      notNull: true,
      reference: "contacts"
    }
  });
};

exports.down = pgm => {};
