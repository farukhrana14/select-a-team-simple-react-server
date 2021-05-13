const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cohpt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//App & Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());




//Connections
client.connect(err => {
    console.log('db connection error:', err);
    const playersCollection = client.db(`${process.env.DB_NAME}`).collection('playersdata');
    

    //API ROOT
    app.get('/', (req, res)=> {
        res.send('403 - Direct Access is Denied')
    });

    //API Get All
    app.get('/playersall', (req, res)=> {
        playersCollection.find({})
            .toArray((err, documents) => {
                console.log(documents);
                res.send(documents);
            })

    });
    
    
    
    
    // client.close();
    console.log('db connected');
  });






app.listen(port, ()=> {
    console.log(`Server is running at ${port}`)
});