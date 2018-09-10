const getJwtToken = require('./common/assert')[1];
const checkJWT = require('./common/assert')[0];

const users = [
  {id: 1, username: 'admin', password: 'admin'},
  {id: 2, username: 'Nikita', password: 'qwerty'}
];

module.exports = (app) => {

  app.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
      res
        .status(400)
        .send("You need a username and password");
      return;
    }

    const user = users.find((u) => {
      return u.username === req.body.username && u.password === req.body.password;
    });

    if (!user) {
      res
        .status(401)
        .send("User not found");
      return;
    }

    const token = getJwtToken({
      id: user.id,
      username: user.name
    });

    res
      .status(200)
      .send({access_token: token});
  });

  app.get('/status', (req, res) => {
    const localTime = (new Date()).toLocaleTimeString();

    res
      .status(200)
      .send(`Server time is ${localTime}.`);
  });

  app.get('/status/secret', checkJWT, (req, res) => {
    res
      .status(200)
      .send(`JWT SECRET ROUTE`);
  });

  app.get('*', (req, res) => {
    res.sendStatus(404);
  });
};


