module.exports = {
  list: (req, res) => {
    const { addressbook } = req.app.get("db");

    const { id } = req.params;

    addressbook.find({ userId: id }).then(contacts => {
      res.status(200).send(contacts);
    });
  }
};
