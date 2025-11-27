const models = require('../models');

const { Domo } = models;

const makerPage = async (req, res) => res.render('app');

const getDomos = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query).select('name age occupation').lean().exec();
    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving domos!' });
  }
};

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.occupation) {
    return res.status(400).json({ error: 'Both name age  and occupation are required!' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    occupation: req.body.occupation,
    owner: req.session.account._id,
  };
  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({
      name: newDomo.name,
      age: newDomo.age,
      occupation: newDomo.occupation,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(500).json({ error: 'an error occured making domo!' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
};
