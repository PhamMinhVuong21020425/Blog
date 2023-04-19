class SearchController {
    // GET /search
    searchGet(req, res) {
        // mặc định tìm đến thư mục views để lấy và render file search.handlebars
        console.log("QUERY GET: " + req.query.q);
        res.render('search');
    }

    searchPost(req, res) {
        // mặc định tìm đến thư mục views để lấy và render file search.handlebars
        console.log("QUERY POST GENDER: " + req.body.gender);
        res.render('news')
    }
}

module.exports = new SearchController;