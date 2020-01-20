function getUserContacts(req, res) {
    const db = req.app.get('db');
    const { user_id } = req.params

    db.query(`SELECT * FROM contact WHERE user_id = ${user_id}`)
        .then(contact => res.status(200).json(contact))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
    // const page = Number(req.query.page);
    // const limit = Number(req.query.limit);

    // db.contact
    //     .find()
    //     .then(users => {
    //         const startIndex = (page - 1) * limit;
    //         const endIndex = page * limit;

    //         const result = {}

    //         if (endIndex < users.length) {
    //             result.next = {
    //                 page: page + 1,
    //                 limit: limit
    //             }
    //         }

    //         if (startIndex > 0) {
    //             result.previous = {
    //                 page: page - 1,
    //                 limit: limit
    //             }
    //         }

    //         result.results = users.slice(startIndex, endIndex);
    //         res.status(200).json(result);
    //     })
    //     .catch(e => {
    //         console.error(e);
    //         res.status(500).end();
    //     })
}

function updateContact(req, res) {
    const db = req.app.get("db");
    const {
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
    } = req.body;
    const { contact_id } = req.params

    db.contacts
        .update(
            {
                contact_id
            },
            {
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
            }
        )
        .then(update => res.status(201).send(update))
        .catch(e => {
            console.err(e);
            res.status(500).end();
        });
}

function deleteContact(req, res) {
    const db = req.app.get('db');
    const { contact_id } = req.params

    db.contact
        .destroy({ contact_id })
        .then(() => {
            res.status(200).send('Contact Deleted')
        })
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function addContact(req, res) {
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

function contactAsc(req, res) {
    const db = req.app.get("db");
    const { user_id } = req.params

    db.query(
        `SELECT *
        FROM contact 
        WHERE user_id = ${user_id} 
        ORDER BY contact.fname ASC`
    )
        .then(contact => res.status(200).json(contact))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}

function contactDesc(req, res) {
    const db = req.app.get("db");
    const { user_id } = req.params

    db.query(
        `SELECT *
        FROM contact 
        WHERE user_id = ${user_id} 
        ORDER BY contact.lname ASC`
    )
        .then(contact => res.status(200).json(contact))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}

module.exports = {
    getUserContacts, updateContact, deleteContact, addContact, contactAsc, contactDesc
}