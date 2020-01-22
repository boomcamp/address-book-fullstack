/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('members', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        contactId: {
            type: 'integer',
            notNull: true,
            references: '"contact"',
        },
        GroupId: {
            type: 'integer',
            notNull: true,
            references: '"groups"',
        },
        first_name: {
            type: 'text',
            notNull: true,
        },
        last_name: {
            type: 'text',
            notNull: true,
        },
        mobile_number: {
            type: 'text',
            notNull: true,
        },
    });
};

exports.down = (pgm) => {

};