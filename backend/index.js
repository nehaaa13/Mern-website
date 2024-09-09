const express = require("express");     // importing express
const cors = require("cors");
require("./db/config");                // connecting datbase
const User = require('./db/User');   // importing the User Model
const Product = require('./db/Product'); 

const app = express();                 //Creating an Express Application. This instance will be used to define routes and middleware for the web server.

app.use(express.json());            //Using Middleware to Parse JSON.This middleware parses incoming requests with JSON payloads, making the data available in req.body.
app.use(cors());                    //Using as a Middleware

app.post("/register", async(req, resp)=>{       //Asynchronous function allows await inside it //async - when we enter data in db it returns promise, async is used to handle promise

    let user= new User(req.body);              // This line creates a new instance of the Users model with the data from the request body (req.body).
    let result = await user.save();         // This line saves the new user document to the database and waits for the operation to complete. The await keyword pauses the execution of the function until the promise returned by user.save() resolves.
    result = result.toObject();             // To hide password within Object. (In localhost & console as well)
    delete result.password;
    resp.send(result);                  // This line sends the result of the save operation back to the client as the response. 
});



app.post("/login", async(req, resp)=>{
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password");
    if(user){
        resp.send(user);
    }
    }
    else{
        resp.send("result: User Not Found");
    }
});

app.post("/add-product", async(req,resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products", async(req,resp)=>{
    let products = await Product.find();
    if(products.length>0){
        resp.send(products);
    }
    else{
        resp.send("No Products Found");
    }
})

app.delete("/product/:id", async(req, resp)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    resp.send(result) ;
})
app.listen(5000);  