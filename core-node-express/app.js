const express = require('express')
const app = express()
const port = 3000

app.use(express.static('plugins'));
app.use(express.static('js'));


app.get('/', (req, res) => res.send('Hello World!'))


app.get('/home', (req, res) => {

	res.sendFile( __dirname + "/views/home.html")
})

app.get('/about',function(req, res){

	res.send("this is about file. mod");
	
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

