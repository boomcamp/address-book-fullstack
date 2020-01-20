/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('groups_members',{
    groupMember_ID: {
      type: 'serial',
      primaryKey: true
    },
    groupID: {
      type: 'int',
      notNull: true,
      unique: false,
      length: 11,
      references: '"groups"',
      foreignKey: {
        name: 'groupMember_groupID_fk',
        table: 'groups',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
    },
    abID: {
      type: 'int',
      notNull: true,
      unique: false,
      length: 11,
      references: '"address_book"',
      foreignKey: {
        name: 'groupMember_abID_fk',
        table: 'address_book',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    }
  })
};

exports.down = (pgm) => {
  return pgm.dropTable()
};
