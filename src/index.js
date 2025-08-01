require('dotenv').config();
const fs = require('fs');
const express = require('express');
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { body, validationResult } = require('express-validator');

const app = express();
const port = process.env.PORT || 8080;
const jwtKey = process.env.JWT_SECRET;
const dbPath = process.env.DB_PATH;
const defaultSuperAdmin = process.env.DB_SUPER_ADMIN || 'admin';
const defaultSuperAdminPassword = process.env.DB_SUPER_ADMIN_PASSWORD || 'admin123';
const db = new sqlite3.Database(dbPath);

if (!fs.existsSync(dbPath)) {
  console.log('Creating DB...');
  db.serialize(() => {
    db.run(`CREATE TABLE users (username TEXT UNIQUE, password TEXT, role TEXT DEFAULT 'user')`);
    db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`, [defaultSuperAdmin, defaultSuperAdminPassword, 'admin']);
  });
}

app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

function checkToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.redirect('/');
  jwt.verify(token, jwtKey, (err, user) => {
    if (err) {
      res.clearCookie('token');
      return res.redirect('/');
    }
    req.user = user;
    next();
  });
}

app.get('/', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.render('index');
  jwt.verify(token, jwtKey, (err) => {
    if (err) {
      res.clearCookie('token');
      return res.render('index');
    }
    res.redirect('/dashboard');
  });
});

app.post('/login',
  [body('username').trim().notEmpty().isLength({ min: 5 }), body('password').trim().notEmpty().isLength({ min: 8 })],
  (req, res) => {
    if (!validationResult(req).isEmpty()) return res.redirect('/?error=1');

    const { username, password } = req.body; 
    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [username, password], (err, user) =>{
      if (err || !user) return res.redirect('/?error=2');

      const expiresIn = user.role === 'admin' ? '12h' : '1h';
      const token = jwt.sign({ username: user.username, role: user.role }, jwtKey, { expiresIn });
      res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 12 * 3600000 });
      res.redirect('/dashboard');
    });
  });

app.get('/logout', (req, res) => res.clearCookie('token').redirect('/'));

app.get('/dashboard', checkToken, (req, res) =>
  res.render('dashboard', { username: req.user.username, role: req.user.role, token: req.cookies.token })
);

app.get('/adduser', checkToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Forbidden');
  res.render('adduser');
});

app.post('/api/adduser', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(404);

  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err || decoded.role !== 'admin') return res.sendStatus(404);

    const { username, password, role } = req.body;
    if (!username || !password || !role) return res.status(400).json({ error: 'Missing fields' });

    db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`, [username, password, role], function (err) {
      if (err) return res.status(err.code === 'SQLITE_CONSTRAINT' ? 409 : 500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    });
  });
});

app.get('/api/users', checkToken, (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(404);

  db.all(`SELECT username, role FROM users`, (err, users) => {
    if (err) return res.status(500).json({ error: 'Failed to load users' });
    res.json(users);
  });
});

app.delete('/api/deleteuser/:username', checkToken, (req, res) => {
  const { username } = req.params;
  const token = req.cookies.token;
  if (!token || !username) return res.sendStatus(404);

  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err || decoded.role !== 'admin') return res.sendStatus(404);
	if (username === req.user.username) return res.status(403).json({ error: "You can't delete yourself" });
    if (username === defaultSuperAdmin) return res.status(403).json({ error: "You can't delete SuperAdmin" });

    db.run(`DELETE FROM users WHERE username = ?`, [username], function (err) {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
      res.json({ success: true, deleted: username });
    });
  });
});

app.listen(port, () => console.log(`Server at http://localhost:${port}`));
