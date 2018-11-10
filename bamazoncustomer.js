var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');


//Connect to the SQL table
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "",
    database: "amazonDB"
});


connection.connect(function (err) {

    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startProgram();
}); //Close connection.connect


//This function asking if you wanto to see the inventory
function startProgram() {

    inquirer
        .prompt([{
            message: "You are in Bamazon ! Please, would you like to see our products?",
            name: "viewinventory",
            type: "confirm",
            default: true

        }]).then(function (view) {

            if (view.viewinventory === true) {
                showInventory();
            } else {
                console.log("Thanks for visit Bamazon");
            }


        }); //Close then view

} //Close StartProgram

//This function will show the table

function showInventory() {

    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    listInventory();

    // 
    function listInventory() {

        //Variable creation from DB connection

        connection.query("SELECT * FROM products", function (err, res) {
            //console.log("*********" + res);

            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;
                //For to fullfill the table
                table.push(
                    [itemId, productName, departmentName, price, stockQuantity]
                );
            }

            console.log(table.toString());

            askPurchase();
        });
    }
} // Close list inventory
//************************************ */
function askPurchase() {

    inquirer.prompt([{

        name: "purchase",
        type: "confirm",
        message: "Are interested in buy one of the items",
        default: true

    }]).then(function (answer) {

        if (answer.purchase === true) {
            callQuestions();
        } else {
            console.log("Thanks for you answer, We will expect to see you in the future");
        }
    });

} //Close ask purchase

//**************************************** */


//Call the questions  

function callQuestions() {

    inquirer
        .prompt([{
            name: "idvalue",
            type: "input",
            message: "Please select the item ID of the Product you want:"
        }, {
            name: "units",
            type: "input",
            message: "How many units of this item would you like to purchase?",
        }]).then(function (purchase) {

            //

            connection.query("SELECT * FROM products WHERE item_id=?", purchase.idvalue, function (err, res) {


                // console.log("***" + res.length);

                if (res.length == 0) {
                    console.log("Wrong ID");
                    startProgram();

                }

                //console.log(res);

                for (var i = 0; i < res.length; i++) {

                    if (purchase.units > res[i].stock_quantity) {

                        console.log("----------------------------------");
                        console.log("Insuficient Quantity");
                        console.log("-----------------------------------");
                        startProgram();

                    } else {

                        console.log("-----------------------------------------------");
                        console.log("We have products available in the stock");
                        console.log("-----------------------------------------------");
                        console.log("Here you order");
                        console.log("------------------------------------------------");
                        console.log("Item selected: " + res[i].product_name);
                        console.log("From Department: " + res[i].department_name);
                        console.log("Cost: " + res[i].price);
                        console.log("Units: " + purchase.units);
                        console.log("------------------------------------------------");
                        console.log("Total: " + res[i].price * purchase.units);
                        console.log("-------------------------------------------------");

                        var Stock = (res[i].stock_quantity - purchase.units);
                        var purchaseId = (purchase.idvalue);


                        confirmPurchase(Stock, purchaseId);
                    }
                }

            });
        });




} //Close callQuestions



function confirmPurchase(Stock, purchaseId) {

    inquirer.prompt([{
        type: "confirm",
        name: "updatepurchase",
        message: "Please confirm that you want to complete the purchase?",
        default: true

    }]).then(function (completepurchase) {

        if (completepurchase.updatepurchase === true) {

            connection.query("UPDATE products SET ? WHERE ?",
                [{
                    stock_quantity: Stock
                }, {
                    item_id: purchaseId

                }],
                function (err, res) {
                    console.log("--------------------------------");
                    console.log("Transaction done!");
                    console.log("----------------------------------");
                    startProgram();
                });
            //Close connection query 


        } else {

            console.log("------------------------------------");
            console.log("No problem you can continue looking at!");
            console.log("-------------------------------");
            startProgram();

        }




    }); //Close confirm purchase

}