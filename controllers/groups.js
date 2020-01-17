module.exports = {
  list: (req, res) => {
    const { contacts } = req.app.get("db");

    const { id } = req.params;
    contacts.find({ group_id: id }).then(contacts => {
      res.status(200).send({
        group_id: id,
        contactList: contacts
      });
    });
  },
  addNew: (req, res) => {
    const { groups } = req.app.get("db");

    groups.insert(req.body).then(() => {
      res.status(200).send({ message: "successfully created" });
    });
  },
  delete: (req, res) => {
    const { groups, contacts } = req.app.get("db");

    const { id } = req.params;
    groups.destroy({ id: id }).then(() => {
      contacts.find({ group_id: id }).then(list => {
        list.map(contact =>
          contacts.update({ id: contact.id }, { group_id: null })
        );
      });
      res.status(200).send({ message: "successfully deleted" });
    });
  },
  editGroup: (req, res) => {
    const { groups } = req.app.get("db");

    const { id } = req.params;
    groups.update({ id: id }, req.body).then(() => {
      res.status(200).send({ message: "successfully updated" });
    });
  },
  viewDetails: (req, res) => {
    const { groups } = req.app.get("db");

    const { id } = req.params;
    groups.find({ id: id }).then(group => {
      res.status(200).send(group);
    });
  }
};
