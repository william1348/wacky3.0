const express = require('express')
const path = require('path')
const { MongoClient } = require("mongodb");
const app = express()
const util = require('util')
const port = 3000
var db;
var client;
var CATEGORIES = [];
var ITEMS = [];

var dbUrl ="mongodb+srv://admin:ilovemillie123@project.cib5r.mongodb.net/?retryWrites=true&w=majority";

async function connectMongo(){
	(async () => {
        client = await MongoClient.connect(dbUrl,
            { useNewUrlParser: true });

        db = client.db('project');
        try {

			CATEGORIES = await db.collection("categories").find({}).toArray();
			ITEMS = await db.collection("items").find({}).toArray();

        }
        finally {
            console.log("all loaded");
    		app.set("view engine", "ejs");
			app.use(express.static(path.join(__dirname, "public")));

			app.listen(port, () => {
			  console.log(`Example app listening on port ${port}`)
			});

    		app.get("/", (req, res) => {
				res.render("index", { categories: CATEGORIES})
			});

			app.get("/browse", (req, res) => {
				refreshItems();
				res.render("browse", {categories: CATEGORIES, items : ITEMS})
			});
        }
    })()
        .catch(err => console.error(err));
}

connectMongo();


async function refreshItems(){
	console.log('refresh items');
	ITEMS = await db.collection("items").find({}).toArray();
}
