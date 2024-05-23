const connection = require('../config/database')


const getHomepage = (rep, res) => {
    res.send("hello i'. from controller");

    let users = [];
    connection.query('select * from mechandise', function (err, results, fields) {
        users = results;
        console.log(results);
        console.log("check user", users)
        res.send(JSON.stringify(users));

    })

}


module.exports = {
    getHomepage
}