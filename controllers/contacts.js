module.exports = {
  addNewContact: (req, res) => {
    const { contacts } = req.app.get("db");

    console.log(req.body);
    contacts
      .insert(
        {
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
        { deepInsert: true }
      )
      .then(() => {
        res.status(201).send({ message: "successfully added" });
      });
  }
};
