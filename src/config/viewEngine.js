const handlebars = require('express-handlebars');
import path from 'path';

const configViewEngine = (app) => {
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
    app.set('views', path.join(__dirname, '../resources/views'));
}

export default configViewEngine;