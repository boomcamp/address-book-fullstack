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
        phone: {
            type: 'integer',
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
