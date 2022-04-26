const Person = require("../models/Person");
const { Op } = require("sequelize");



const PersonController = {
  async listar(req, res) {
    // //person?nome=vinny
    // req.query

    // //params/person/:nome
    // req.params.nome

    // req.body

    const { termo, page = 1, limit = 30 } = req.query;
    const offset = parseInt(limit) * (parseInt(page) - 1);
    let filter = {
      limit: parseInt(limit),
      offset,
      attributes: ["person_name"]
    };

    if (termo) {

      Object.assign(filter, {
        where: {
          // person_name: {[Op.like]: `%${termo}%`}, é a mesma coisa da linha de baixo
          person_name: { [Op.substring]: termo},
         },
      });
    }
    const people = await Person.findAll(filter);
    res.json(people);
  },
  async atualizar(req, res) {
    const { id } = req.params;
    const { person_name } = req.body;

    await Person.update(
      {
        person_name,
      },
      {
        where: {
          person_id: id,
        },
      }
    );

    const personUpdated = await Person.findByPk(id);
    res.status(200);
    return res.json(personUpdated);
  },
};

module.exports = PersonController;
