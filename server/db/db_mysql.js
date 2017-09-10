var mysql = require('mysql');

// Base routes for default index/root path, about page, 404 error pages, and others..
exports.register = function(server, options, next){

	// var pool  = mysql.createPool({
 //  	connectionLimit : 10,
 //  	host            : '127.0.0.1',
 //  	port            :  3306,
 //  	user            : 'root',
 //  	password        : 'root',
 //  	database        : 'mydb',
 //  	charset         : 'utf8_general_ci'
	// });

	 
	//  server.expose('pool', pool);

	 next();
}

exports.register.attributes = {
    name: 'mysql'
};
