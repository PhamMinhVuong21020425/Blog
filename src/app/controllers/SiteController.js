class SiteController {
    // GET /
    home(req, res) {
       // mặc định tìm đến thư mục /views và render file home.handlebars
       res.render('home')
       //res.sendStatus(200)
       //res.status(200).send('Connect success...')
    }
}

module.exports = new SiteController;