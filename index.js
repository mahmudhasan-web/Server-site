const express = require('express')
const cors = require('cors')
const app = express()
const Port = 3000

app.use(express.json())
app.use(cors({
    origin: [`http://localhost:5173`],
    credentials: true
}))



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mahmudhasan:xnERIHLzIaEVxgFm@cluster0.vhkuyua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection


        const productDB = client.db("mahmudhasan").collection("product")


        app.post('/product', async (req, res) => {
            const product = req.body
            console.log(product);

            const result = await productDB.insertOne(product)
            res.send(result)

        })


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(Port, () => {
    console.log(`Server is running at this ${Port}`);

})