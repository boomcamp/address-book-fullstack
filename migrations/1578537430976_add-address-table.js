exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('address', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        userId: {
            type: 'integer',
            notNull: true,
            references: 'users',
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
        barangay: {
            type: 'text',
            notNull: true,
        }
    });
};

exports.down = (pgm) => {

};
