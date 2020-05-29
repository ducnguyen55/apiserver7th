const express = require('express');
const app =express();
const bodyParser = require('body-parser');
var multer = require('multer');
var upload= multer();
var mongoose = require('mongoose');
const expressValidator = require('express-validator');
require('dotenv/config');

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
        },
        "securityDefinitions": {
            "api_key": {
                "type": "apiKey",
                "name": "api_key",
                "in": "header"
            }
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
 * /product/get-data:
 *   get:
 *    summary: Returns all product
 *    description: Get response in url/contact/get-data
 *    responses:
 *      '200':
 *        description: All Product in database
 * /contact/get-data:
 *   get:
 *    tags: 
 *    - "contact"
 *    summary: Returns all contact on web client
 *    description: Get response in url/contact/get-data
 *    responses:
 *      '200':
 *        description: All contact
 * /contact/insert:
 *   post:
 *    tags: 
 *    - "contact"
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
 * /user/register:
 *   post:
 *    tags: 
 *    - "user"
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
 *    tags: 
 *    - "user"
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
 * /product/insert:
 *   post:
 *    tags: 
 *    - "admin"
 *    description: Add product
 *    parameters:
 *    - name: type
 *      description: Please enter product type(vest,dress,juyp,set)
 *      in: formData
 *      required: true
 *      type: string
 *    - name: name
 *      description: Please enter product name
 *      in: formData
 *      required: true
 *      type: string
 *    - name: url
 *      description: Please enter url image
 *      in: formData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Please enter product price
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      '200':
 *        description: Success !!!
 * /product/update:
 *   patch:
 *    tags: 
 *    - "admin"
 *    description: Update product's information
 *    parameters:
 *    - name: id
 *      description: Please enter product id want to update
 *      in: formData
 *      type: integer
 *      required: true
 *    - name: name
 *      description: Please enter product name
 *      in: formData
 *      type: string
 *      required: true
 *    - name: price
 *      description: Please enter product price
 *      in: formData
 *      type: integer
 *      required: true
 *    responses:
 *      '200':
 *        description: Update Success !!
 * /product/{id}:
 *   delete:
 *    tags: 
 *    - "admin"
 *    description: Delete product
 *    parameters:
 *    - name: id
 *      description: Please enter product id want to delete
 *      in: path
 *      type: integer
 *      required: true
 *    responses:
 *      '200':
 *        description: Success !!
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