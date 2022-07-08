import express from 'express';
var router = express.Router();

import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.basename(__filename));
const file = path.join(__dirname, 'db', 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
await db.read();
db.data ||= { users: []}

/* GET home page. */
router.post('/', async function(req, res, next) {
	db.data.users.push({...req.body});
	await db.write();
	res.redirect('/');
});

export default router;
