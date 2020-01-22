/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('groups', {
        groupId: {
            type: 'serial',
            primaryKey: true,
        },
        userId: {
            type: 'integer',
            notNull: true,
            references: '"users"',
        },
        groupName: {
            type: 'text',
            notNull: true,
        }
    });
};

exports.down = (pgm) => {

};