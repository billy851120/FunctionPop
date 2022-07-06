const { call } = require('file-loader');
var mysql = require('mysql');

exports.exec = (sql, data, callback) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'functionpop',
    multipleStatements: true
  });
  connection.connect();

  connection.query(sql, data, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    callback(results, fields, err);
  });
  connection.end();
};
