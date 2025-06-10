const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const { conn } = require('./database/config.js'); // Importar la conexión a la base de datos
const { Pokemon, Type } = require('./routes/routes');

const server = express();
server.name = 'API';

// Configuración de middlewares
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Actualiza esto según tu dominio
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Llamar al método para popular la base de datos una sola vez

// Rutas                                                                                                                                                                                       5 
server.use('/api/pokemon', Pokemon);
server.use('/api/types', Type);

// Error catching endware
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Sincronizar los modelos y arrancar el servidor
conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log("%s listening at port " + process.env.PORT); // eslint-disable-line no-console
  });
});

module.exports = server;