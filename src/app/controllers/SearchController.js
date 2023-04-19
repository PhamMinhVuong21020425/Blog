class SearchController {
    // GET /search
    searchGet(req, res) {
        // mặc định tìm đến thư mục views để lấy và render file search.handlebars
        console.log("QUERY GET: " + req.query.q);
        res.render('search');
    }

    async searchPost(req, res) {
        const pool = require('./ConnectDB');

        let { email, password, gender, remember } = req.body;

        if (!email || !password || !gender) {
            res.status(400).send('Bad Request');
            return;
        }

        const sql = 'INSERT INTO user(email, password, gender, remember) VALUES (?, ?, ?, ?)';
        try {
            await pool.execute(sql, [email, password, gender, remember]);
            console.log("QUERY POST: " + JSON.stringify(req.body));
            res.redirect('/');
        } catch (err) {
            console.log("ERROR: " + err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new SearchController;