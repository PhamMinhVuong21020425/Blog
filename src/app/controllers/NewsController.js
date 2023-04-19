class NewsController {
    // GET /news
    index(req, res) {
        // mặc định tìm đến thư mục views để lấy file news.handlebars
        res.render('news');
    }

    // GET /news/:detail
    detail(req, res) {
        res.send('DETAIL NEWS');
    }
}

module.exports = new NewsController;