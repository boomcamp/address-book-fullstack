exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('groups-contact', {
        group_contact_id: {
            type: 'serial',
            primaryKey: true
        },
        group_id: {
            type: 'integer',
            notNull: true,
            references: '"groups"'
        },
        contact_id: {
            type: 'integer',
            notNull: true,
            references: '"contact"'
        }
    });
};

exports.down = (pgm) => {

};
