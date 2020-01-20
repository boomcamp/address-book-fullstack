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
        first_name: {
            type: 'text',
            notNull: true,
        },
        last_name: {
            type: 'text',
            notNull: true,
        },
        home_phone: {
            type: 'text',
            notNull: true,
        },
        mobile_phone: {
            type: 'text',
            notNull: true,
        },
        work_phone: {
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
        state_province: {
            type: 'text',
            notNull: true,
        },
        postal_code: {
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
