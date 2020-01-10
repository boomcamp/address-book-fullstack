exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('phone', {
        phone_id: {
            type: 'serial',
            primaryKey: true,
        },
        home_pnumber: {
            type: 'integer'
        },
        mobile_pnumber: {
            type: 'integer'
        },
        work_pnumber: {
            type: 'integer'
        },
        contact_id: {
            type: 'integer',
            references: 'contact'
        }
    });
}

exports.down = (pgm) => {

};
