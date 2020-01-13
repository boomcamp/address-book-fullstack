module.exports = {
  contact: (req, res, next) => {
    const { contacts } = req.app.get("db");

    const { id } = req.params;

    contacts
      .findOne({ id: id })
      .then(contact => {
        if (!contact) {
          throw new Error("contact does not exist");
        }

        next();
      })
      .catch(err => {
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  },
  group: (req, res, next) => {
    const { groups } = req.app.get("db");

    const { id } = req.params;
    groups
      .findOne({ id })
      .then(group => {
        if (!group) {
          throw new Error("group does not exist");
        }

        next();
      })
      .catch(err => {
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  }
};
