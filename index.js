const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const UserSchema = require('./models/userSchema');
const BicycleSchema = require('./models/bicycleSchema');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  'mongodb+srv://platzi-admin:ry53G2C0QWcYeJK2@curso-platzi.epy0r.gcp.mongodb.net',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) throw err;

    console.log('Base de datos online');
  }
);

app.get('/', (req, res) => {
  res.json({
    hola: 'mundo'
  });
});

app.post('/login', (req, res) => {
  const body = req.body;

  UserSchema.findOne({ email: body.email }, (err, user) => {
    if (err) return res.status(500).json({ message: err });
    if (!user) return res.status(400).json({ message: 'Not found' });

    if (!bcrypt.compareSync(body.password, user.password)) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    res.status(201);
    res.json({
      user
    });
  });
});

app.post('/register', (req, res) => {
  const { name, email, dni, password } = req.body;

  const user = new UserSchema({
    name,
    email,
    dni,
    password: bcrypt.hashSync(password, 10)
  });

  user.save((err, user) => {
    if (err) return res.status(400).json({ message: err });

    res.status(201);
    res.json({
      message: 'created',
      user
    });
  });
});

app.get('/bicycles', (req, res) => {
  BicycleSchema.find({}, (err, bicycles) => {
    if (err) return res.status(500).json({ message: err });
    if (!bicycles) return res.status(400).json({ message: 'Not found' });

    res.status(200);
    res.json({
      bicycles
    });
  });
});

app.post('/bicycles', (req, res) => {
  const { marca, aro, nombre, tipo, imagenURL, especificaciones } = req.body;

  const bicycle = new BicycleSchema({
    marca,
    aro,
    nombre,
    tipo,
    imagenURL,
    especificaciones
  });

  bicycle.save((err, user) => {
    if (err) return res.status(400).json({ message: err });

    res.status(201);
    res.json({
      message: 'created',
      bicycle
    });
  });
});

app.get('/bicycles/:id', (req, res) => {
  const { id } = req.params;

  BicycleSchema.findOne({ _id: id }, (err, bicycle) => {
    if (err) return res.status(500).json({ message: err });
    if (!bicycle) return res.status(400).json({ message: 'Not found' });

    res.status(200);
    res.json({
      bicycle
    });
  });
});

app.delete('/bicycles/:id', (req, res) => {
  const { id } = req.params;

  BicycleSchema.deleteOne({ _id: id }, (err) => {
    if (err) return res.status(500).json({ message: err });

    res.status(200);
    res.json({
      message: `${id} deleted`
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Escuchando en el puerto 3000');
});
