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

    const { id } = req.params;

    contacts
      .find({ userId: id })
      .then(contacts =>
        contacts.map(x => {
          delete x.userId;
          return x;
        })
      )
      .then(contactList => {
        groups.find({ userId: id }).then(groups => {
          groups.map(x => {
            delete x.userId;
            return x;
          });
          res.status(200).send({
            userId: id,
            addressBook: contactList,
            groups: groups
          });
        });
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
