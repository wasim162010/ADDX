var express = require('express');
const bodyParser = require("body-parser");
var app = express();
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*
USER1 ID : U102323
USER2 ID : U346634
*/
app.get('/', function (req, res) {

})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("app listening at http://%s:%s", host, port)
 })


 app.get('/v1/account/balances/reset', function (req, res) {

    fs.writeFile('../balances/U102323.txt', '10000', function (err) {
        if (err) throw err;
             console.log('reseted the balance of user1 to 10000');
      });

      fs.writeFile('../balances/U346634.txt', '10000', function (err) {
        if (err) throw err;
            console.log('reseted the balance of user2 to 10000');
      });

      res.send('reseted the balance of user 1 and user2 to 10000');

 })

 app.post('/v1/account/balance/transfer', function (req, res) {

    console.log(req.body); //{ transfer_from: 'user1', transfer_to: 'user2', amount: '10' }
    const reqBody = req.body;
    console.log(reqBody.transfer_from); 
    var fromFile = reqBody.transfer_from +  ".txt";
    var toFile = reqBody.transfer_to +  ".txt";
    console.log(fromFile); 
    console.log(toFile); 
    var targetBal=0
    fs.readFile("../balances/"+toFile, function(err, buf) {
        targetBal = parseInt(buf.toString());
        console.log(targetBal);
      });

    fs.readFile("../balances/"+fromFile, function(err, buf) {
        if (err) res.send('Error in reading the '+ fromFile + "balance"); 
        var bal = buf.toString()

        if(bal < reqBody.amount)  {
            res.send('In sufficient balance to initiate the transfer'); 
        } else {
            bal  = bal -  reqBody.amount;
            targetBal = targetBal +  reqBody.amount;

               fs.writeFile("../balances/"+toFile, targetBal, function (err) {
                    if (err) res.send('Issue in updating balance for' + reqBody.transfer_to); 
                    else {
                        fs.writeFile("../balances/"+fromFile, bal, function (err) {
                            if (err) res.send('Issue in updating balance for' + reqBody.transfer_from); 
                            else {
                                res.send('Transaction successful'); 
                            }
                        });
                    }
                });

        }//else

      });
 
 })

 app.get('/v1/account/balances', async (req, res) => {

  fs.readFile('../balances/U102323.txt' , function(err, buf) {
      var bal1,bal2;
      if (err) res.send('Error in reading');    
      else {
          bal1  = buf.toString();

          fs.readFile('../balances/U346634.txt' , function(err, buf1) {

              bal2  = buf1.toString();

              res.send({
                  balances: [{ user_id: 'U102323', balance: bal1}, { user_id: 'U346634', balance: bal2}],
              })


          });

      }
  
  });

})