const supertest = require('supertest');
const app = require('../app'); // Az express appod helye
const api = supertest(app);
const User = require('../models/User');

test('user creation fails with proper statuscode and message if username is too short', async () => {
  const newUser = {
    username: 'ab',
    name: 'Short Username',
    password: 'password',
  };

  const result = await api.post('/api/v1/users').send(newUser).expect(400);

  expect(result.body.error).toContain('at least 3 characters long');
});

test('user creation fails with proper statuscode and message if password is too short', async () => {
  const newUser = {
    username: 'ValidUsername',
    name: 'Valid Name',
    password: 'pw',
  };

  const result = await api.post('/api/v1/users').send(newUser).expect(400);

  expect(result.body.error).toContain('at least 3 characters long');
});

test('userExtractor sets the user in req object', async () => {
  // Először is, létrehozol egy felhasználót és egy token-t számára
  const user = new User({ username: 'testuser', password: 'testpassword' });
  await user.save();

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  // Most csinálsz egy API kérést a token-nel
  await supertest(app)
    .get('/someRoute') // a route, amit tesztelni szeretnél
    .set('Authorization', `Bearer ${token}`)
    .expect(200) // vagy bármilyen válasz, amit vársz
    .expect((res) => {
      // itt ellenőrizheted a válaszban lévő adatokat
    });
});
