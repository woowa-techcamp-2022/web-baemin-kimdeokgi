import express from 'express';
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', {title: 'Login'});
});

export default router;