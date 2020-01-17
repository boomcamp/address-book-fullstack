/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('contacts', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        userid: {
            type: 'integer',
            notNull: true,
            references: 'users', 
        },
        groupid: {
            type: 'integer',
            notNull: false,
            references: 'group_contact', 
        },
        firstName: {
            type: 'text',
            notNull: true,
        },
        lastName: {
            type: 'text',
            notNull: true,
        },
        homePhone: {
            type: 'text',
            notNull: true,
        },
        mobilePhone: {
            type: 'text',
            notNull: true,
        },
        workPhone: {
            type: 'text',
            notNull: true,
        },
        email: {
            type: 'text',
            notNull: true,
        },
        city: {
            type: 'text',
            notNull: true,
        },
        stateProvince: {
            type: 'text',
            notNull: true,
        },
        postalCode: {
            type: 'text',
            notNull: true,
        },
        country: {
            type: 'text',
            notNull: true,
        },
    })
};

exports.down = pgm => {};
