const express = require('express')
const path = require('path')
const { MongoClient } = require("mongodb");
const app = express()
const util = require('util')
const port = 3000


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
		//console.log(util.inspect(result))
			res.render("index", { categories: result})
		});
	});

	  

	app.get("/browse", (req, res) => {
	  res.render("browse")
	});

	app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
	})


});
