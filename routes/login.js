import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { Low, JSONFile } from 'lowdb';
import { v4 } from 'uuid';
var router = express.Router();

const cookieConfig = {
  httpOnly: true,
  maxAge: 1000000,
  signed: false
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.basename(__filename));
const file = path.join(__dirname, 'db', 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
await db.read();

router.get('/', function(req, res, next) {
  const token = req.cookies.user;
  if (req.session.loggedIn && req.session.loggedIn[token]) {
    res.redirect('/');
  } else {
    res.render('login', {title: 'Login'});
  }
});

router.post('/', async (req, res) => {
  const key = v4();
  const {id, pw} = req.body;
  const isLoggedIn = db.data.users.some(user => user.email === id && user.password === pw);
  if (isLoggedIn) {
    req.session.loggedIn = {
      [key]: id
    }
    res.cookie('user', key, cookieConfig);
    res.redirect('/index');
  } else {
    res.redirect('/login')
  }
})

export default router;