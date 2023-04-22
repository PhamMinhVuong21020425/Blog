
class SiteController {
    // GET /
    async home(req, res) {
        const pool = require('./ConnectDB');
        const sql = 'SELECT * FROM user';
        await pool.execute(sql, function (err, results, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Lấy danh sách tên cột của kết quả truy vấn
            const columnName = fields.map(field => field.name)
            const dataUser = results.map(result => result)

            // Trả về kết quả truy vấn dưới dạng JSON, bao gồm tên cột và dữ liệu
            res.render('home', { columnName, dataUser });
        });
        // mặc định tìm đến thư mục /views và render file home.handlebars
        //res.render('home')
        //res.sendStatus(200)
        //res.status(200).send('Connect success...')
    }

    async users(req, res) {
        const pool = require('./ConnectDB');
        const userID = req.params.userID;
        const sql = 'SELECT * FROM user WHERE id = ?';
        await pool.execute(sql, [userID], function (err, results, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Trả về kết quả truy vấn dưới dạng JSON, bao gồm tên cột và dữ liệu
            res.send(results);
        });
    }

    async deleteUser(req, res) {
        const userID = req.body.id;
        const pool = require('./ConnectDB');
        const sql = 'DELETE FROM user WHERE id = ?';
        await pool.execute(sql, [userID], function (err, results, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Trả về kết quả truy vấn dưới dạng JSON, bao gồm tên cột và dữ liệu
            res.redirect('/');
        });
    }
    async testPlane(req, res) {
        const connection = require('./ConnectPlane');
        const sql = "Select * from Project";
        await connection.execute(sql, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.render('planscale');
        })
    }

    async postPlane(req, res) {
        const connection = require('./ConnectPlane');
        let { id, user_id, name, status, priority, des, finished_time, started_time } = req.body;
        const sql = 'INSERT INTO Project VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        await connection.execute(sql, [id, user_id, name, status, priority, des, finished_time, started_time], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.redirect('/plans');
        })
    }

}

module.exports = new SiteController;