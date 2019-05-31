var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "yourRootPassword",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId);
  run();
});

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}


function run() {
  console.log("Retreving items...");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
  });
  buyChoice();
}


function buyChoice() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message:
        "If you would like to buy an item, type in the id number. \n If not just select exit",
      choices: ["Buy", "exit"]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Buy":
          buyProduct();
          break;

        case "exit":
          connection.end();
      }
    });
}

function buyProduct() {
  inquirer
    .prompt([{
      name: "item_id",
      type: "input",
      message:
        "To purchase input the id number of the product that you would like to buy.",
        validate: validateInput,
        filter: Number
    },
    {
      name: "quantity",
      type: "input",
      message: "How many do you need?",
      validate: validateInput,
      filter: Number
    }])
    .then(function(input) {
      
      var item= input.item_id;
      var quantity = input.quantity;

      var queryStr = 'SELECT * FROM products WHERE ?';
      connection.query(queryStr , {item_id: item}, function(err, data){
        if (err) throw err;

        if (data.length === 0) {
          console.log("Error, invalis Item ID. select valid id please");
          buyChoice();
        }else{
          var productData = data[0];

          if (quantity <= productData.stock_quantity){
            console.log(" the item you requested is in stock");

            var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
            
            connection.query(updateQueryStr, function(err, data) {
              if (err) throw err;

              console.log(" your oder has been placed. your total is $" + productData.price * quantity);
              
              connection.end();
            })
          } else {
            console.log("what you want we do not have");

            buyChoice();
          }
        }
      })
    })
} 
     