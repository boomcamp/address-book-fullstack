exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('address', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        userid: {
            type: 'integer',
            references: 'users',
            notNull: true,
        },
        country: {
            type: 'text',
            notNull: true,
        },
        region: {
            type: 'text',
            notNull: true,
        },
        province: {
            type: 'text',
            notNull: true,
        },
        city: {
            type: 'text',
            notNull: true,
        },
    })

};

exports.down = (pgm) => {

};
