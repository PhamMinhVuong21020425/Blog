const express = require('express')
const path = require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars')

const app = express();

require('dotenv').config();

// Nếu process.env.PORT không được định nghĩa (undefined) thì sẽ lấy giá trị là 8080
const port = process.env.PORT || 8080;

const route = require('./routes/index')

// HTTP logger
app.use(morgan('tiny'))


app.use('/static', express.static(path.join(__dirname, 'public')))

console.log('PATH OF DIRNAME: ', path.join(__dirname, 'public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

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

//Handle routers
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})