/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    userID: {
      type: 'serial',
      primaryKey: true,
    },
    username: {
      type: 'text',
      notNull: true,
      unique: true
    },
    password: {
      type: 'text',
      notNull: true,
    },
    last_login_time: {
      type: 'text',
      notNull: false
    }
  });
};

exports.down = pgm => {
  return pgm.dropTable('users');
};
