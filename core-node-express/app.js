const express = require('express')
const app = express()
const port = 3000

app.use(express.static('plugins'));
app.use(express.static('js'));
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost/student_db");
var db = mongoose.connection;
db.on('error',function(){
	console.log("Problem in connecting mongo db server. ");
});
db.once('open',function(){
	console.log('db is connected');
	
});

var studentSchema = new mongoose.Schema({
	name: String,
	roll_no: Number
});
var Student = mongoose.model('Student',studentSchema);



function insertStudent(name,roll_no){
	var s1 = new Student({
		name: name || "hamid",
		roll_no : roll_no|| 64
	});
	
	s1.save((err,obj)=>{
		if(err) return console.error(err);
		console.log("s1 saved");
	});
}

function showStudents(){
	Student.find((err,obj)=>{
		if(err) return console.error(err);
		console.log("All Students: ",obj);
	});
}
app.get('/', (req, res) => res.send('Hello World!'))


app.get('/home', (req, res) => {

	res.sendFile( __dirname + "/views/home.html")
})

app.get('/about',function(req, res){

	res.send("this is about file. mod");
	
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

