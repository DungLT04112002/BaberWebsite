const connection = require('../config/database')


const getHomepage = (rep, res) => {
    // res.send("hello i'. from controller");

    let users = [];
    connection.query('select * from mechandise', function (err, results, fields) {
        users = results;

        res.json(results);
        // res.send(JSON.stringify(users));

    })

}


module.exports = {
    getHomepage
}