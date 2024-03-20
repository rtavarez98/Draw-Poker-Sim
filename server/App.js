const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const { authToken } = require('./middleware/authMiddleware');
const mainRoute = require('./routes/routes');

require('dotenv').config({ path: './.env' });
app.use(cors());
app.use(express.json());

const port = process.env.PORT;
const uri = process.env.URI;
const connectDB = async () => {
    try {
        const db = await mongoose.connect(uri);
        console.log("MongoDB Connected:" + db.connection.host)
    } catch(err) {
        console.log(err);
    }
}

//connect to db
connectDB();

//verify token
app.use(authToken);

//routes
app.use('/', mainRoute);

app.listen(port, () => {
    console.log("App is listening on port " + port)
});