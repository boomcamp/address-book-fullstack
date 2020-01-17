module.exports = {
  addNewContact: (req, res) => {
    const { contacts } = req.app.get("db");

    contacts.insert(req.body).then(() => {
      res.status(201).send({ message: "successfully added" });
    });
  },
  updateContact: (req, res) => {
    const { contacts } = req.app.get("db");

    const { id } = req.params;

    contacts
      .update({ id: id }, req.body)
      .then(() => res.status(202).send({ message: "successfully updated" }));
  },
  deleteContact: (req, res) => {
    const { contacts } = req.app.get("db");

    const { id } = req.params;

    contacts
      .destroy({ id: id })
      .then(() => res.status(202).send({ message: "successfully removed" }));
  },
  list: (req, res) => {
    const { contacts, groups } = req.app.get("db");
    const db = req.app.get("db");
    const { sort } = req.query;
    const { id } = req.params;
    const fN = contactList => {
      groups.find({ user_id: id }).then(groups => {
        groups.map(x => {
          delete x.user_id;
          return x;
        });
        res.status(200).send({
          user_id: id,
          addressBook: contactList,
          groups: groups
        });
      });
    };

    if (sort) {
      db.query(
        `select * from contacts where user_id=${id} order by lastname asc`,
        { id: id }
      )
        .then(contacts =>
          contacts.map(x => {
            delete x.user_id;
            return x;
          })
        )
        .then(contactList => {
          fN(contactList);
        });
    }

    contacts
      .find({ user_id: id })
      .then(contacts =>
        contacts.map(x => {
          delete x.user_id;
          return x;
        })
      )
      .then(contactList => {
        fN(contactList);
      });
  },
  viewDetails: (req, res) => {
    const { contacts } = req.app.get("db");

    const { id } = req.params;
    contacts.findOne({ id: id }).then(contact => {
      res.status(200).send(contact);
    });
  }
};
