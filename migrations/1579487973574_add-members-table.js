exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('members', {
        id: {
            type: 'serial',
            primaryKey: true
        },
        userid: {
            type: 'integer',
            references: 'users',
            notNull: true  
        },
        contactid: {
            type: 'integer',
            references: 'contacts',
            notNull: true,
            onDelete: 'cascade',
        },
        groupid: {
            type: 'integer',
            references: 'groups',
            notNull: true,
            onDelete: 'cascade',
        },
    })
};

exports.down = (pgm) => {

};
