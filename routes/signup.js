import express from 'express';
var router = express.Router();



/* GET home page. */
router.post('/', function(req, res, next) {
	console.log(req.body);
	db.get('users').push({...req.body});
	res.render('signup', { title: 'Express' });
});

export default router;
