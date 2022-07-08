import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from "express-session";
import bodyParser from 'body-parser';
import logger from 'morgan';
// import FileStore from 'session-file-store';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import loginRouter from './routes/login.js';
import termsRouter from './routes/terms.js';
import authPhoneRouter from './routes/authPhone.js';
import userInfoRouter from './routes/userInfo.js';
import signupRouter from './routes/signup.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 세션 세팅
app.use(
  session({
    secret: "web_baemin_kimdeokgi",
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   httpOnly: true,
    // },
    // store: new FileStore()(session),
  })
)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/terms', termsRouter);
app.use('/authPhone', authPhoneRouter);
app.use('/userInfo', userInfoRouter);
app.use('/signup', signupRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log('START APP PORT: ', PORT)
})

export default app;
