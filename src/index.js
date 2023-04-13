const express = require('express')
const path = require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars')

const app = express()
const port = 3001

app.use(morgan('tiny'))

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

//console.log('PATH: ', path.join(__dirname, 'views'));

//set đường dẫn để thư viện handlebar tìm đến dirname
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', function (req, res) {
  // mặc định tìm đến thư mục /views và render file home.handlebars
   res.render('home')
})

app.get('/news', function (req, res) {
  // mặc định tìm đến thư mục views và render file home.handlebars
   res.render('news')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})