function addToAddBook(req, res) {
    const db = req.app.get('db');

    db.addressbook
        ,insert({
            contact_id: req.body.contact_id,
            user_id: req.body.user_id
        },{
            deepInsert: true
        })
        .then(book => res.status(201).json(book))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}