/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('group_contact', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        groupName: {
            type: 'text',
            notNull: true,
        },
        userid: {
            type: 'integer',
            notNull: true,
            references: 'users', 
        },
    })
};

exports.down = (pgm) => {

};
