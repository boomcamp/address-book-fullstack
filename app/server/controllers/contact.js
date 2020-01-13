function getAllData(req, res) {
    const db = req.app.get('db');

    db.contact
        .find()
        .then(users => res.status(200).json(users))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function getDataById(req, res) {
    const db = req.app.get('db');
    const { contact_id } = req.params;

    db.contact
        .findOne({
            id: contact_id
        })
        .then(contact => res.status(200).json(contact))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function updateUser(req, res) {
    const db = req.app.get('db');
    const { contact_id } = req.params;

    db.contact
        .update({
            id: contact_id
        }, req.body)
        .then(contact => res.status(201).send(contact))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function deleteUser(req, res) {
    const db = req.app.get('db');

    db.contact
        .destroy(req.query)
        .then(contact => {
            res.status(200).json(contact)
        })
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function searchUser(req, res) {
    const db = req.app.get('db');

    db.contact
        .search({
            fields: ['fname', 'lname'],
            term: req.query.name
        })
        .then(contact => res.status(200).json(contact))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function addUser(req, res) {
    const db = req.app.get('db');
    const {user_id} = req.query;
    const {fname, lname} = req.body;

    db.contact
        .insert({
            fname: fname,
            lname: lname,
            addressbook: [
                {
                    user_id: user_id,
                    contact_id: undefined
                }
            ]
        }, {
            deepInsert: true
        })
        .then(user => res.status(201).json(user))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })

}

module.exports = {
    getAllData, getDataById, updateUser, deleteUser, searchUser, addUser
}