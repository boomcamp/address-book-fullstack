/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('address_book',{
    abID: {
      type: 'serial',
      primaryKey: true
    },
    userID: {
      type: 'int',
      notNull: true,
      unique: false,
      length: 11,
      references: '"users"',
      foreignKey: {
        name: 'address_book_userID_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    ab_firstName: {
      type: 'text',
      notNull: true
    },
    ab_lastName: {
      type: 'text',
      notNull: true
    },
    ab_home_phone: {
      type: 'text',
      notNull: false
    },
    ab_mobile_phone: {
      type: 'text',
      notNull: false
    },
    ab_work_phone: {
      type: 'text',
      notNull: false
    },
    ab_email: {
      type: 'text',
      notNull: false
    },
    ab_city: {
      type: 'text',
      notNull: false
    },
    ab_state: {
      type: 'text',
      notNull: false
    },
    ab_postal_code: {
      type: 'text',
      notNull: false
    },
    ab_country: {
      type: 'text',
      notNull: false
    },
  })
};

exports.down = (pgm) => {
  return pgm.dropTable('address_book');
};
