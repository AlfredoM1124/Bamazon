// Declaring npm dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");

// Establish connection to MySQL database
var connection = mysql.createConnection({
	host: "Local_Host",
	port: 3306,

	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function (err){
	if(err) throw err;
	console.log("Connected as ID: " + connection.threadId + "\n");
	// Initiates the application
	startBamazon();
});

var startBamazon = function() {
	// Prompts user for commands 
	inquirer
		.prompt({
			name: "action",
			type: "rawlist",
			message: "Welcome to Bamazon! How would you like to proceed?",
			// You may choose from one of the following options...
			choices: [
			"Browse Bamazon Shop",
			"Purchase Products",
			"Low-Stock Inventory",
			"Quit Bamazon"
			]
		})
		.then(function (answer){
			
		});
}