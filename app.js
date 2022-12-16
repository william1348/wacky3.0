const express = require('express')
const path = require('path')
const { MongoClient } = require("mongodb");
const app = express()
const util = require('util')
const port = 3000
var CATEGORIES = [];
var ITEMS = [];

var dbUrl ="mongodb+srv://admin:ilovemillie123@project.cib5r.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(dbUrl, (err, client) => {
    console.log('we connected');
	if (err) return console.log(err)
	db = client.db('project') 
	
	app.set("view engine", "ejs");
	app.use(express.static(path.join(__dirname, "public")));

	app.get("/", (req, res) => {

	db.collection("categories").find({}).toArray(function(error, result) {
	    	if (err) throw err;	
    	CATEGORIES = result;
		//console.log(util.inspect(result))
			res.render("index", { categories: result})
		});
	});

	db.collection("items").find({}).toArray(function(error, result) {
	    if (err) throw err;
    	//res.json({"IsSuccess" : true, "items" : result})	
    	//console.log('items length: ' + result.length)
    	ITEMS = result;
	});



	app.get("/browse", (req, res) => {
		res.render("browse", {items: CATEGORIES})

	});

	app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
	})


});
