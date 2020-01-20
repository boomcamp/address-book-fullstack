function createContact(req, res) {
    const db = req.app.get("db");
    const { userId, first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_or_province, postal_code, country } = req.body;
    db.contact
        .save({
            userId,
            first_name,
            last_name,
            home_phone,
            mobile_phone,
            work_phone,
            email,
            city,
            state_or_province,
            postal_code,
            country
        },
            {
                fields: ["id", "userId", "first_name", "last_name", "home_phone", "mobile_phone", "work_phone", "email", "city", "state_or_province", "postal_code", "country"]
            })
        .then(post => res.status(201).json(post))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}

function getContact(req, res) {
    const db = req.app.get("db");
    db.contact
        .find()
        .then(post => res.status(201).json(post))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}
function sortContact(req, res) {
    const db = req.app.get("db");
    db.query(
        `SELECT * FROM contact ORDER BY last_name ${req.params.sort}`
    ).then(sort => res.status(201).send(sort))
        .catch(err => {
            res.status(500).end();
        })
}

function updateContact(req, res) {
    const db = req.app.get("db");
    const { first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_or_province, postal_code, country } = req.body;
    db.contact
        .update(
            {
                id: req.params.id
            },
            {
                first_name: first_name,
                last_name: last_name,
                home_phone: home_phone,
                mobile_phone: mobile_phone,
                work_phone: work_phone,
                email: email,
                city: city,
                state_or_province: state_or_province,
                postal_code: postal_code,
                country: country
            }
        )
        .then(post => res.status(201).send(post))
        .catch(err => {
            console.err(err);
            res.status(500).end();
        });
}
function deleteContact(req, res) {
    const db = req.app.get("db");
    db.query(
        `DELETE FROM contact where id=${req.params.id}`
    ).then(del => res.status(201).send(del))
        .catch(err => {
            console.log(err)
            res.status(500).end();
        })
}

module.exports = {
    createContact,
    getContact,
    updateContact,
    deleteContact,
    sortContact
}