const express = require('express')
const path = require('path')
const { MongoClient } = require("mongodb");
const app = express()
const util = require('util')
const port = 3000
var db;
var CATEGORIES = [];
var ITEMS = [];

var dbUrl ="mongodb+srv://admin:ilovemillie123@project.cib5r.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(dbUrl, (err, client) => {
    console.log('we connected');
	if (err) return console.log(err)
	db = client.db('project') 
	
	loadCoreAsync();
	
	app.set("view engine", "ejs");
	app.use(express.static(path.join(__dirname, "public")));


	app.get("/", (req, res) => {
		res.render("index", { categories: CATEGORIES})
	});

	// db.collection("categories").find({}).toArray(function(error, result) {
	//     	if (err) throw err;	
 //    	CATEGORIES = result;
	// 	//console.log(util.inspect(result))
	// 		res.render("index", { categories: result})
	// 	});
	// });

	



	app.get("/browse", (req, res) => {
		res.render("browse", {items: ITEMS})
	});

	app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
	})

});


async function loadCoreAsync(){
	db.collection("categories").find({}).toArray(function(error, result) {
    	if (error) throw error;	
    	CATEGORIES = result;
	});

	db.collection("items").find({}).toArray(function(error, result) {
	    if (error) throw error;
    	ITEMS = result;
	});


}