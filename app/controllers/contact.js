function addcontact(req, res) {
  const db = req.app.get("db");

  const {
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
  } = req.body;

  db.contact
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
      {
        deepInsert: true
      },
      {
        fields: [
          "id",
          "first_name",
          "last_name",
          "home_phone",
          "mobile_phone",
          "work_phone",
          "email",
          "city",
          "state_or_province",
          "postal_code",
          "country"
        ]
      }
    )
    .then(contacts => res.status(201).json(contacts))
    .catch(err => {
      console.error(err);
    });
}
module.exports = {
  addcontact
};
