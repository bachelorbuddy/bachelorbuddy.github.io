const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();
require("dotenv").config();
const port =  process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j6dr7tz.mongodb.net/?retryWrites=true&w=majority `;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    const database = client.db("bachelorBuddy");
    const bachelorBuddy = database.collection('downloads');


    app.get("/downloads", async(req, res) => {
        const filter = {_id: new ObjectId('659d2641e04bdbe53712de32')};
        const data = await bachelorBuddy.findOne(filter);
        res.send(data);
    })

    app.patch("/downloads", async (req, res) => {
        const filter = {_id: new ObjectId("659d2641e04bdbe53712de32")};
        const count = await bachelorBuddy.findOne(filter);
        const result = await bachelorBuddy.updateOne(filter, {
            $set: {
                count: count.count + 1
            }
        });
        res.send({message: "success"});
    });



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);




app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(port , ()=>{
    console.log(`Server is running at http://localhost:${port}`);
});