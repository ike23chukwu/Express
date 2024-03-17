const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require("cors");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(cors({
    origin: ['http:127.0.0.1:5500'],
    credentials: true
}));

app.use((req, res, next) => {
    console.log('Request was made');

    next();
});

app.get('/getBlogs', (req, res) => {

    const data = [
        {
            title: "My first class",
            body: "This is my first class",
            author: "Emeka"
        }
    ];

    const response = {
        message: "Fetched all blogs sucessfully",
        statusCode: 200,
        status: "success",
        data
    };

    res.status(200).json(response);
});

app.post('/postBlog', (req, res) => {

    const { title, body, author } = req.body;

    try {
        if (!title || !body || !author) {
            throw Error("All fields are required");
        }

        const response = {
            message: "Successfully posted a blog",
            statusCode: 200,
            status: "success",
            data: { title, body, author }
        };

        res.status(200).json(response);
    }
    catch (error) {
        const response = {
            message: error.message,
            statusCode: 400,
            status: "failed",
        };
        res.status(400).json(response);
    }
});


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
