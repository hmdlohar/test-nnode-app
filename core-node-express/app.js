const express = require('express')
const app = express()
const port = 2999
const MongoClient = require("mongodb").MongoClient

var db;


MongoClient.connect('mongodb://localhost:27017', (err, database) => {
  	console.log("db is connected");
  	db = database.db("student_db");
  	
})



app.use(express.static('plugins'));
app.use(express.static('js'));


app.get('/', (req, res) => res.send('Hello World!'))


app.get('/home', (req, res) => {

	res.sendFile( __dirname + "/views/home.html")
})

app.get('/about',function(req, res){

	res.send("this is about file. mod");
	
});

app.get('/api/books', (req, res) => {
    res.json([
            {
                id: 1,
                title: "Alice's Adventures in Wonderland",
                author: "Charles Lutwidge Dodgson"
            },
            {
                id: 2,
                title: "Einsteins Dreams",
                author: "Alan Lightman"
            }
        ])
})

app.get('/insertOneStudent',(req,res)=>{
	
	res.send("hello");
	return;
	var lastRollNo = db.collection("students").find().limit(1).sort({$natural:-1}).toArray((err,arr) => {
		console.log(req.query)
		db.collection("students").insertOne(req.query,(err,status)=>{
			if(err)
				console.log("err:" ,err.errmsg)
			if(status)
				res.json(status);
			else
				res.send("error occured");
		});
		
	})
	
	
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

