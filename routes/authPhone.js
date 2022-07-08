import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('authPhone', {title: '배달의민족 - 회원가입'});
});

export default router;