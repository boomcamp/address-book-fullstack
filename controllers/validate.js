module.exports = {
  user: (req, res, next) => {
    const { users } = req.app.get("db");

    const { username } = req.body;

    users
      .findOne({ username: username })
      .then(user => {
        if (user) {
          throw new Error("Username already exists");
        }

        next();
      })
      .catch(err => {
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  },
  contact: (req, res, next) => {
    const { contacts } = req.app.get("db");

    const { id } = req.params;

    contacts
      .findOne({ id: id })
      .then(contact => {
        if (!contact) {
          throw new Error("Contact does not exist");
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
          throw new Error("Group does not exist");
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
