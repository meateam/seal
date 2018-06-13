
const app = makeServer();

function makeServer() {
  const express = require('express');
  const app = express();
  app.get('/', (req, res) => {
    res.status(200).send('ok');
  });
  const server = app.listen(3000, () => {
    const port = server.address().port;
    console.log('Example app listening at port %s', port);
  });
  return server;
}
