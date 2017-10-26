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
			cliTable.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
		}
		// Display results in Command Line
		console.log(cliTable.toString());
		startBamazon();
	});
}
// Begin "buyProducts" function
var buyProducts = function(){
	// Prompt the user for desired purchase
	console.log("What Item would you like to purchase? (Enter Item ID)");
	connection.query("SELECT * FROM products", function (err, results){
		// Begin inquirer prompt
		inquirer
			.prompt([
				{
					name: "itemID",
					type: "input",
					message: "Enter the ID of the item you would like to purchase: ",
					validate: function (val){
						if (isNan(val) === false) {
							return true;
						}
						return false;
					}
				},
				{
					name: "itemAmount",
					type: "input",
					message: "How many of this item would you like?",
					validate: function (val) {
						if (isNaN(val) === false){
							return true;
						}
						return false;
					}
				}
			  ])
			.then(function (solution){
				// Evaluates the result of the purchase and either accepts or denies order
				var item = solution.itemID;
				var amount = solution.itemAmount;
				var updateStock = results[item - 1].stock_quantity;
				var newAmount = updateStock - amount;
				var productPrice = results[solution.itemID - 1].price;
				// Respond to user 
				console.log("Your order has been processed!\n" + "Total Cost: " + amount * productPrice);

				// Re-adjust inventory amount after purchase...
				if (amount < updateStock) {
					var query = connection,query("UPDATE products SET ? WHERE ?",
						[
						{ stock_quantity: newAmount },
						{ item_id: item }
						],
						// --- PLACEHOLDER for updating inventory---- 
						);
					// Ordering more than what is available will result in an error.
					} else {
						console.log("Insufficient amount of product available. Please come back later!");
					}
					// console.log(query.sql);
					startBamazon();
		});		    
	});
};

// Begin lowInventory functionality ...
var lowInventory = function(){
	console.log("These items are almost out of stock! \n");
	// Uses MySQL query to filter through available products
	connection.query("SELECT * FROM products", function (err, res){

		if (err) throw err;
		// If no error proceed to show inventory...
		// Arrange inventory in CLI table
		var cliTable = new table({
			// Establish column heading
			head: ["Item ID", "Product Name", "Department", "Price", "In Stock"],
			colWidths: [15, 25, 20, 15, 15]
		});

		for (var i = 0; i < res.length; i++){
			if (res[i].stock_quantity < 4) {
				cliTable.push(
					[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
					);
			}
		}
		// Render the produced table on the Command Line...
		console.log(cliTable.toString());
		startBamazon();
	});
}
