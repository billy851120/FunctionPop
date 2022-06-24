const { call } = require('file-loader');
var mysql = require('mysql');

exports.exec = (sql, data, callback) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'functionpop',
  });
  connection.connect();

  connection.query(sql, data, function (err, results,  ) {
    if (err) {
      console.log(err);
    }
    callback(results, fields);
  });
  connection.end();
};
