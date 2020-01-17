function getAllData(req, res) {
    const db = req.app.get('db');
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    db.contact
        .find()
        .then(users => {
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            const result = {}

            if (endIndex < users.length) {
                result.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            if (startIndex > 0) {
                result.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            result.results = users.slice(startIndex, endIndex);
            res.status(200).json(result);
        })
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
            contact_id
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
            contact_id
        }, req.body)
        .then(contact => res.status(201).send(contact))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function deleteUser(req, res) {
    const db = req.app.get('db');
    const { contact_id } = req.params

    db.contact
        .destroy({ contact_id })
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
    const name = req.params

    db.contact
        .search({
            term: name,
            fields: ['fname', 'lname']
        })
        .then(contact => res.status(200).json(contact))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function addUser(req, res) {
    const db = req.app.get('db');
    const { fname, lname, home_phone, mobile_phone, work_phone, city, state, postal_code, country } = req.body;
    const { user_id } = req.params

    db.contact
        .insert({
            fname,
            lname,
            home_phone,
            mobile_phone,
            work_phone,
            city,
            state,
            postal_code,
            country,
            user_id
        }, {
            deepInsert: true
        })
        .then(contact => {
            res.status(201).json({ ...contact })
        })
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })

}

module.exports = {
    getAllData, getDataById, updateUser, deleteUser, searchUser, addUser
}