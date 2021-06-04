const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());


const port = 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ooccc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


app.get('/', (req, res) => {
    res.send('hello from db, its working');
})

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const eventCollection = client.db("volunteerNetwork").collection("events");
    
    app.post('/addEvents', (req, res) => {
        const event = req.body;
        console.log(event)
        eventCollection.insertOne(event)
            .then(result => {
                // console.log(result.insertedCount);
                res.send(result.insertedCount > 0)

            })
    });

    

});




app.listen(process.env.PORT || port)