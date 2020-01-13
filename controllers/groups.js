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
  }
};
