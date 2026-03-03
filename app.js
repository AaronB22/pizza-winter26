//imports
import express from 'express';
import mysql2 from 'mysql2'
import dotenv from "dotenv"

dotenv.config();
//Create an express app
const app = express();

//Define PORT
const PORT= 3000;
//Set EJS as the view engine, vroom vroom
app.set('view engine', 'ejs')
//Static file serving

app.use(express.static('public'))

//middleware that allows express to read data

app.use(express.urlencoded({extended:true}));

//Temp array to store orders

const orders=[];

const pool= mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

app.get('/db-test', async(req,res)=>{
    try{
        const pizza_orders= await pool.query('SELECT * FROM orders');
        res.send(pizza_orders[0]);
    }
    catch(err){
        console.error('Database error: ',err)
    }
});

app.post('/submit-order', (req,res)=>{
    //Create JSON object to store order data
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email:req.body.email,
        toppings: req.body.toppings ? req.body.toppings : "none",
        method: req.body.method,
        size: req.body.size,
        comment: req.body.comment,
        timestamp: new Date()
    }
    //add order to orders array
    orders.push(order);
    // res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
    res.render('confirmation', {order})
})

app.get('/admin', (req, res) => {
    res.render('admin', {orders})
});

// Define our main route ('/')
app.get('/', (req,res)=>{
    // res.sendFile(`${import.meta.dirname}/views/home.html`);
    res.render('home')
});

app.get('/contact-us', (req,res)=>{
    // res.sendFile(`${import.meta.dirname}/views/contact.html`);
    res.render('contact')
})
app.get('/thank-you', (req, res) => {
    // res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
    res.render('confirmation')
})

//Start Server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
});