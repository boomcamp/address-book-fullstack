exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('contact', {
        contact_id: {
            type: 'serial',
            primaryKey: true,
        },
        fname: {
            type: 'text',
            notNull: true,
        },
        lname: {
            type: 'text',
            notNull: true,
        },
        home_phone: {
            type: 'bigint',
            notNull: true,
        },
        mobile_phone: {
            type: 'bigint',
            notNull: true,
        },
        work_phone: {
            type: 'bigint',
            notNull: true,
        },
        city: {
            type: 'text',
            notNull: true
        },
        state: {
            type: 'text',
            notNull: true
        },
        postal_code: {
            type: 'integer',
            notNull: true
        },
        country: {
            type: 'text',
            notNull: true
        },
        user_id: {
            type: 'integer',
            references: 'users'
        }
    });
};

exports.down = (pgm) => {

};
