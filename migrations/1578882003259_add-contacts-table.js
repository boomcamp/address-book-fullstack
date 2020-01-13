/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('contacts', {
    contact_userID: {
      type: 'serial',
      primaryKey: true
    },
    userID: {
      type: 'int',
      notNull: true,
      unique: true,
      length: 11,
      references: '"users"',
      foreignKey: {
        name: 'contact_userID_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    user_firstName: {
      type: 'text',
      notNull: true
    },
    user_lastName: {
      type: 'text',
      notNull: true
    },
    user_home_phone: {
      type: 'text',
      notNull: false
    },
    user_mobile_phone: {
      type: 'text',
      notNull: false
    },
    user_work_phone: {
      type: 'text',
      notNull: false
    },
    user_email: {
      type: 'text',
      notNull: false
    },
    user_city: {
      type: 'text',
      notNull: false
    },
    user_state: {
      type: 'text',
      notNull: false
    },
    user_country: {
      type: 'text',
      notNull: false
    },
    user_postal_code: {
      type: 'text',
      notNull: false
    },
  })
};

exports.down = (pgm) => {
  return pgm.dropTable('contacts');
};
