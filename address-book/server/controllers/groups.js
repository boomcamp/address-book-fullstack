 
function createGroup(req, res) {
  
    const db = req.app.get('db')
  
          const { userid, group_name } = req.body
    
          db.groups
              .save({
                  userid,
                  group_name,
              })
              .then(group => res.status(201).json(group))
              .catch(err => {
                  res.status(500).end()
    })
            
  }
  function getGroups(req, res){
    const db = req.app.get('db')

  db.groups
  .find({userid: req.params.id})
  .then(groups => res.status(200).json(groups))
  .catch(err => {
    console.error(err);
    res.status(500).end();
  });
  }
  module.exports = {
    createGroup,
    getGroups
  };