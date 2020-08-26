const express = require('express');

const DateSchema = require('../models/dateSchema');

function calidadApi(app) {
  const router = express.Router();
  app.use('/calidad', router);

  router.post('/dates', (req, res) => {
    const {
      especialidad,
      alergia,
      medicamento,
      email,
      sintomas,
      user,
      time,
      realizado
    } = req.body;

    const date = new DateSchema({
      especialidad,
      alergia,
      medicamento,
      email,
      sintomas,
      user,
      time,
      realizado
    });

    date.save((err, date) => {
      if (err) return res.status(400).json({ message: err });

      res.status(201);
      res.json({
        message: 'created',
        date
      });
    });
  });

  router.get('/dates', (req, res) => {
    DateSchema.find({}, (err, dates) => {
      if (err) return res.status(500).json({ message: err });
      if (!dates) return res.status(400).json({ message: 'Not found' });

      res.status(200);
      res.json({
        dates
      });
    });
  });

  router.get('/dates/:id', (req, res) => {
    const { id } = req.params;

    DateSchema.findOne({ _id: id }, (err, date) => {
      if (err) return res.status(500).json({ message: err });
      if (!date) return res.status(400).json({ message: 'Not found' });

      res.status(200);
      res.json({
        date
      });
    });
  });
}

module.exports = calidadApi;
