const newsRouter = require('./newsRouter');
const searchRouter = require('./searchRouter');
const siteRouter = require('./siteRouter');

function route(app) {
    
    app.use('/', siteRouter);

    app.use('/news', newsRouter);

    app.use('/search', searchRouter);

}

module.exports = route;