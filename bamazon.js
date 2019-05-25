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

  connection.connect(function(err){
      if (err) throw err;
      console.log("connected as id" + connection.threadId)
      run();
  });

  function run() {
      console.log('Retreving items...');
      connection.query("SELECT * FROM products", function(err, res){
          if (err) throw err;
          console.log(res)
      });
     buyChoice();
  }

  function buyChoice() {
      inquirer
      .prompt({
          name: "action",
          type: "list",
          message: "If you would like to buy an item, type in the id number. \n If not just select exit",
          choices: [
              "Buy",
              "exit"
          ]
      })
      .then(function(answer){
          switch (answer.action) {
              case "Buy":
              buyProduct();
              break;

              case "exit":
              connection.end()
          }
      });
  }

  function buyProduct() {
      inquirer
      .prompt({
          name: "purchase",
          type: "input",
          message: "To purchase input the id number of the product that you would like to buy."
      })
      .then(function(answer){
          var query = "SELECT product_name, price, stock_quantity FROM products WHERE ? ";
          connection.query(query, { purchase: answer.id }, function(err, res){
            for (var i = 0; i < res.length; i++) {
                console.log("product name: " + res[i].product_name + " || price: " + res[i].price + " || stock: " + res[i].stock_quantity);
            }
            run();
          })
      })
  }