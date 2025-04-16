
const server = require('./src/server.js');
const { conn } = require('./src/database/config.js');


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log("%s listening at port," + process.env.PORT); // eslint-disable-line no-console
  });
})