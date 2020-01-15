module.exports = {
  list: (req, res) => {
    const { contacts } = req.app.get("db");

    const { id } = req.params;
    contacts.find({ groupId: id }).then(contacts => {
      res.status(200).send({
        groupId: id,
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
    const { groups } = req.app.get("db");

    const { id } = req.params;
    groups.destroy({ id: id }).then(() => {
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
