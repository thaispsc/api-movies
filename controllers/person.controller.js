const Person = require("../models/Person");

const PersonController = {
  async listar(req, res) {
    const people = await Person.findAll({ limit: 100 
    });
    res.json(people);
  },
  async atualizar (req, res) {
      const {id} = req.params;
      const {person_name} = req.body;

        await Person.update({
            person_name,
        }, {
            where: {
                person_id: id,
            }
        });

        const personUpdated =  await Person.findByPk(id);
        res.status(200);
        return res.json(personUpdated);
  }
};

module.exports = PersonController;
