class AuthController {

    static createHash(password) {
        const bcrypt = require('bcrypt');
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }

    static comparePassword(password, hash) {
        const bcrypt = require('bcrypt');
        return bcrypt.compareSync(password, hash);
    }

    // GET /news
    login(req, res) {
        // mặc định tìm đến thư mục views để lấy file news.handlebars
        res.render('login', { layout: 'auth' });
    }

    async logPost(req, res) {
        console.log('LOGIN: ', req.session.id);
        const pool = require('../ConnectDB');

        let { email, password, remember = 'off' } = req.body;

        if (!email || !password) {
            res.status(400).send('Bad Request');
            return;
        }

        const que = 'SELECT password, count(*) as "check" FROM user WHERE email = ?';
        await pool.execute(que, [email], async (err, result) => {
            if (err) {
                console.log('ERROR: ' + err);
                res.status(500).send('Internal Server Error');
                return;
            }
            console.log('RESULTS: ', result);
            if (result[0].check != 1 || !AuthController.comparePassword(password, result[0].password)) {
                res.send('Dang nhap that bai!!!');
                return;
            }

            const sql = 'UPDATE user SET remember = ? WHERE email = ?';
            await pool.execute(sql, [remember, email], (err, results) => {
                if (err) {
                    console.log('ERROR: ' + err);
                    res.status(500).send('Internal Server Error');
                    return;
                }
            });
            req.session.regenerate(function (err) {
                if (err) next(err)
                req.session.email = req.body.email;
                res.cookie(req.body.email, true);
                if (!req.session.tabId) {
                    // Nếu không có thông tin về tabId trong session, tạo mới và lưu vào session
                    req.session.tabId = Date.now();
                }
                console.log(`Tab ID: ${req.session.tabId}`);
                req.session.save(function (err) {
                    if (err) return next(err)
                    res.redirect('/');
                });
            });
        });
    }

    // GET /news/:detail
    signup(req, res) {
        res.render('register', { layout: 'auth' });
    }

    async signPost(req, res) {
        const pool = require('../ConnectDB');

        let { name, email, password, repeat, remember = 'off', ...rest } = req.body;

        if (!email || !password || (repeat != password)) {
            res.status(400).send('Bad Request');
            return;
        }

        const sql = 'INSERT INTO user(name, email, password, remember) VALUES (?, ?, ?, ?)';
        await pool.execute(sql, [name, email, AuthController.createHash(password), remember], (err, results) => {
            if (err) {
                console.log('ERROR: ' + err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.redirect('/');
        });
    }
}

module.exports = new AuthController;