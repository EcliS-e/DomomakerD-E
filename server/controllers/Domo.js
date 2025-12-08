const models = require('../models');

const { Domo } = models;

const makerPage = async (req, res) => res.render('app');
const alterPage = async (req, res) => res.render('alter');

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
const searchDomo = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required to perform a search' });
  }

  let doc;
  try {
    doc = await Domo.findOne({ name: req.body.name }).exec();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }

  // return res.status(404).json({ error: 'No domos found' });

  return res.json({ name: doc.name, age: doc.age, occupation: doc.occupation });
};

const alterDomo = async (req, res) => {
  if (!req.body.name && !req.body.age && !req.body.occupation) {
    return res.status(400).json({ error: 'at least one field is required!' });
  }
  const query = { owner: req.session.account._id };

  const updatePromise = await Domo.find(query).select.updateOne({}).lean().exec();

  updatePromise.then((doc) => res.json({
    age: doc.age,
    occupation: doc.occupation,
  }));
  updatePromise.catch((err) => {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  });
  return res.status(500).json({ error: 'Something went wrong' });
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
  alterPage,
  alterDomo,
  searchDomo,
};
