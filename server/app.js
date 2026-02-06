const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const postRoute = require('./routes/createpost');

const app = express();
app.use(express.json());
app.use(cors());


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongo connected Successfully");
    } catch (err) {
        console.error("Mongo connection failed!!", err.message);
        process.exit(1);

    }
};

app.get("/", (req, res) => {
    res.send("This is home page ");
    console.log("this is home page");
})


app.use('/api', signupRoute);
app.use('/api', loginRoute);
app.use('/api/posts', postRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDb();
    console.log(`Server is listening on port ${PORT}`);
});