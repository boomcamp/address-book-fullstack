exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('contact',{
        id:{
            type: 'serial',
            primaryKey: true,
        },
        f_name: {
            type: 'text',
            notNull: true,
        },
        l_name: {
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
        state_or_province: {
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
    });
};

exports.down = (pgm) => {

};
