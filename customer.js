// Declaring npm dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("cli-table");
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
			switch(answer.action){

				case "Browse Bamazon Shop";
					showInventory();
					break;

				case "Purchase Products";
					buyProducts();
					break;

				case "Low-Stock Inventory";
					lowInventory();
					break;

				case "Quit Bamazon";
					connection.end();
					break;
			}
		});
}
// Below lies the functionality necessary to run the above code!
// User activates the functions after answering the inquirer prompts...

var showInventory = function() {
	// Reveals all items in Bamazon database.
	connection.query("SELECT * FROM products", function (err, res){

		if (err) throw err;
		// If no error proceed to show inventory...
		// Arrange inventory in CLI table
		var cliTable = new table({
			// Establish column heading
			head: ["Item ID", "Product Name", "Department", "Price", "In Stock"],
			colWidths: [15, 25, 20, 15, 15]
		});
		// Loop through responses to Parse the information 
		for (var i = 0; i < res.length; i++) {
			table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
		}
		// Display results in Command Line
		console.log(table.toString());
		startBamazon();
	});
}
// Begin "buyProducts" function
