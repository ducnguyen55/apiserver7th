const express = require('express');
const app =express();
const bodyParser = require('body-parser');
var multer = require('multer');
var upload= multer();
var mongoose = require('mongoose');

//API documentation
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');

//Extended: https://swagger.io/specification/#infoObject
const swaggerOptions={
    swaggerDefinition: {
        info: {
            title: 'Restful API',
            description: "API information",
            contact: {
                name: "Nguyễn Thanh Đức"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["app.js"]
};

const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/apidocs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /:
 *  get:
 *    description: Get response in main page url/
 *    responses:
 *      '200':
 *        description: welcome my API
 * /contact/get-data:
 *   get:
 *    summary: Returns all contact on web client
 *    description: Get response in url/contact/get-data
 *    responses:
 *      '200':
 *        description: All contact
 * /contact/insert:
 *   post:
 *    description: Create new contact in the database
 *    parameters:
 *    - name: name
 *      description: Please enter name
 *      in: formData
 *      required: true
 *      type: string
 *    - name: gmail
 *      description: Please enter gmail
 *      in: formData
 *      required: true
 *      type: string
 *    - name: message
 *      description: Please enter message
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      '200':
 *        description: Create new contact
 * /product/get-data:
 *   get:
 *    summary: Returns all product
 *    description: Get response in url/contact/get-data
 *    responses:
 *      '200':
 *        description: All Product in database
 * /user/register:
 *   post:
 *    description: Create new user in the database
 *    parameters:
 *    - name: name
 *      description: Please enter name
 *      in: formData
 *      required: true
 *      type: string
 *    - name: gmail
 *      description: Please enter gmail
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: Please enter password
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      '200':
 *        description: Create new account
 * /user/login:
 *   post:
 *    description: Login
 *    parameters:
 *    - name: gmail
 *      description: Please enter gmail
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: Please enter password
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      '200':
 *        description: Return token
 */



app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(upload.array());

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

const url = 'mongodb+srv://we00054643:1Licynduy@shopping-nbfge.mongodb.net/Shopping?retryWrites=true&w=majority';

mongoose
    .connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err))


module.exports = app;