const express = require('express');
const session = require('express-session');
const parseurl = require('parseurl');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const MySQLStore = require('express-mysql-session')(session);
const app = express();

require('dotenv').config();

// Nếu process.env.PORT không được định nghĩa (undefined) thì sẽ lấy giá trị là 8080
const port = process.env.PORT || 8080;

const route = require('./routes/index')

// HTTP logger
//app.use(morgan('tiny'))

app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'public')))

console.log('PATH OF DIRNAME: ', path.join(__dirname, 'public'));

const options = {
  host: 'localhost',
  port: 3308,
  user: 'root',
  password: '',
  database: 'blog',
  //expiration: 60000
};

const sessionStore = new MySQLStore(options);

function generateSessionId(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

app.set('trust proxy', 1)
app.use(session({
  secret: 'doraemon',
  resave: false,
  saveUninitialized: true,
  unset: 'destroy',
  store: sessionStore,
  name: 'session cookie name',
  cookie: { secure: false, maxAge: 10 * 60 * 1000 },
  genid: (req) => {
    // Returns a random string to be used as a session ID
    return generateSessionId(16); // tạo session ID mới cho mỗi lần yêu cầu
  }
}));

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }

  // get the url pathname
  const pathname = parseurl(req).pathname

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  console.log('PAGE VIEWS: ', req.session.views[pathname])
  next()
})

//app đang sử dụng template engine là handlebars bằng function handlebars()
app.engine('.hbs', handlebars.engine(
  //config handlebars
  {
    defaultLayout: 'main',
    extname: '.hbs'
  }
));

//đặt cho app sử dụng view engine handlebars
app.set('view engine', '.hbs');

//set đường dẫn để thư viện handlebar tìm đến dirname
app.set('views', path.join(__dirname, 'resources/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// Access the session as req.session
app.get('/session', function (req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    res.clearCookie(req.session.email);
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/login');
      }
    });
  }
});
//Handle routers
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})