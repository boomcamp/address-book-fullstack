/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('groups',{
    groupID: {
      type: 'serial',
      primaryKey: true
    },
    groupName: {
      type: 'text',
      notNull: true
    },
    userID: {
      type: 'int',
      notNull: true,
      unique: true,
      length: 11,
      foreignKey: {
        name: 'address_book_userID_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
  })
};

exports.down = (pgm) => {

};
