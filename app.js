const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb://mongo:27017/testdb";

app.get('/', async (req, res) => {
    try {
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db("testdb");
        const count = await db.collection("items").countDocuments();

        res.send(`Connected to MongoDB. Documents count: ${count}`);
        await client.close();
    } catch (err) {
        res.send("Error connecting to MongoDB: " + err);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
