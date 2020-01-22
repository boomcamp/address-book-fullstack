exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('addressbook', {
        address_book_id: {
            type: 'serial',
            primaryKey: true
        },
        user_id: {
            type: 'integer',
            references: '"users"'
        },
        contact_id: {
            type: 'integer',
            references: '"contact"'
        }
    });
};

exports.down = (pgm) => {

};
