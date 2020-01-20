exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('groups', {
        id: {
            type: 'serial',
            primaryKey: true,
        },
        userid: {
            type: 'integer',
            references: 'users',
            notNull: true,
        },
        group_name: {
            type: 'text',
            notNull: true,
        },
        date_created: {
            type: 'text',
            notNull: true,
        },
    })
};

exports.down = (pgm) => {

};
