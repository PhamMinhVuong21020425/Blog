const newsRouter = require('./newsRouter');
const searchRouter = require('./searchRouter');
const siteRouter = require('./siteRouter');
const authRouter = require('./authRouter');
const express = require('express');
function route(app) {

    app.use('/', function isAuthenticated(req, res, next) {
        if (req.session.user) next()
        else next('route')
    }, siteRouter);

    app.use('/news', newsRouter);

    app.use('/search', searchRouter);

    app.use('/login', authRouter);

    app.get('/getcookie', (req, res) => {
        // Lấy giá trị của cookie có tên 'username'
        const username = req.cookies.username;

        // Trả về phản hồi HTTP
        res.send(`Username: ${username}`);
    });


}

module.exports = route;