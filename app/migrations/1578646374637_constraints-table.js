exports.constraint = 'unique_email';
exports.username = 'unique_username'

exports.up = (pgm) => {
    pgm.addConstraint('users', exports.constraint, {
        unique: 'email'
    });
    pgm.addConstraint('users', exports.username, {
        unique: 'username'
    });
};

exports.down = (pgm) => {

};
