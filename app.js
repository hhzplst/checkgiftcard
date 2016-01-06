var express = require("express"),
    app = express(),
    jade = require("jade"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    db = require("./models");

app.set("view engine", "jade");
app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("tiny"));

app.get("/", function(req, res){
  res.redirect("/checkout");
});

app.get("/checkout", function(req, res){
  db.Giftcard.find({},function(err, giftcards){
    res.render("checkout", {giftcards: giftcards});
  }); 
});

app.post("/checkcoupon", function(req, res){
  db.Giftcard.findOne({code: req.body.coupon}, function(err, giftcard){
    if(err || !giftcard){
      res.send({err: "There's no such giftcard"});
    }else if(giftcard.value===0){
      res.send({err: "This Coupon has NO VALUE"});
    }else if(giftcard.expiration<Date.now()){
      res.send({err: "This Coupon has EXPIRED"});
    }else{
      //TODO: update the value of the specific coupon
      res.send(giftcard);
    }
  });
});

app.listen(3000, function(){
  console.log("server is listening on port 3000");
});