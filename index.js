const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
// const uri = `mongodb+srv://ExDbUser:cigUtQOzkJGaSq5i@cluster0.kjqp5.mongodb.net/iccTeamPlayers?retryWrites=true&w=majority`;
const uri = "mongodb+srv://ExDbUser:cigUtQOzkJGaSq5i@cluster0.kjqp5.mongodb.net/iccTeamPlayers?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//App & Middleware
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors());

//API
app.get('/', (req, res)=> {
    res.send('403 - Direct Access is Denied')
});

//Connections
client.connect(err => {
    const playersCollection = client.db("iccTeamPlayers").collection("playersData");
    
    //API
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




// client.connect(err => {
//   const playersCollection = client.db("iccTeamPlayers").collection("playersData");

//  //API to fetch all data
//  app.get('/playersdata', (req, res)=> {
//     playersCollection.find({'name': 'Shakib'})
//         .toArray((err, documents)=> {
//             return res.status(200).send(documents);
            
//         })
// });

//   console.log('db connected');
// });


// client.connect(err => {
//     console.log('db connection error:', err);
//     const playersCollection = client.db('iccTeamPlayers').collection("playersData");
    
    // //API to fetch all data
    // app.get('/playersdata', (req, res)=> {
    //     playersCollection.find({})
    //         .toArray((err, documents)=> {
    //             res.send(documents);
    //         })
    // });
    
//     //API to add data
//     app.post('/addplayers', (req, res) => {
//         const data = req.body;
//         console.log(data);
//     })
    
    
    
    
//     console.log('db connected');
// });



app.listen(port, ()=> {
    console.log(`Server is running at ${port}`)
});