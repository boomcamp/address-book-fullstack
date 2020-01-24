exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('groups', {
        group_id: {
            type: 'serial',
            primaryKey: true
        },
        group_name: {
            type: 'text',
            notNull: true
        },
        user_id: {
            type: 'integer',
            notNull: true,
            references: '"users"'
        }
    });
};

exports.down = (pgm) => {

};
