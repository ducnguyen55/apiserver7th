const express = require('express');
const app =express();
const bodyParser = require('body-parser');
var multer = require('multer');
var upload= multer();
var mongoose = require('mongoose');
const expressValidator = require('express-validator');
const cors = require('cors')
require('dotenv/config');

//API documentation
const swaggerUi=require('swagger-ui-express');
const swaggerDocument = require('./apidoc.json');

// Api docs
const options = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Shopping",
    customfavIcon: "./icon.png",
};
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, api_key');
    next();
});
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(upload.array());
app.use(expressValidator());

const Contact=require('./routes/contact');
const User=require('./routes/user');
const Product=require('./routes/product');

app.use('/contact',Contact);
app.use('/user',User);
app.use('/product',Product);

app.use((req,res,next)=>{
    res.status(200).json({
        message:'Hello, Welcome my API !!!!!!!!!'
    });
    next();
});

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('MongoDB Connected!'))
    .catch(err => {
        console.log(err);
    });

module.exports = app;