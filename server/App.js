const express = require('express');
const app = express();
const mainRoute = require('/routes/routes');


//process.env.PORT;
const uri = process.env.URI;

//connect to db
mongoose.connect(uri);

//routes
app.use('/', mainRoute);