const express = require('express');
const PORT = process.env.PORT || 3000;
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // Correct usage of cors middleware

const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://0.0.0.0:27017/');
        const db = client.db("mernblog");
        await operations(db);
        client.close();
    } catch (error) {
        res.status(500).json({ message: "Error connecting to database", error });
    }
};

app.get('/api/articles/:name', async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(articleInfo);
    }, res);
});

app.post('/api/articles/:name/add-comments', async (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;
    withDB(async (db) => {
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne(
            { name: articleName },
            {
                $set: {
                    comments: articleInfo.comments.concat({ username, text })
                }
            }
        );
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.get('/',(req,res)=>{
    res.send("Hy oomb")    
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
