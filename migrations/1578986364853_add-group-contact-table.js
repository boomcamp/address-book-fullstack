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
    })
};

exports.down = (pgm) => {

};
