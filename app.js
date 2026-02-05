//imports
import express from 'express';

//Create an express app
const app = express();

//Define PORT
const PORT= 3000;

//Static file serving

app.use(express.static('public'))

//middleware that allows express to read data

app.use(express.urlencoded({extended:true}));

//Temp array to store orders

const orders=[];

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
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
})

app.get('/admin', (req, res) => {
    res.send(orders);
});

// Define our main route ('/')
app.get('/', (req,res)=>{
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.get('/contact-us', (req,res)=>{
    res.sendFile(`${import.meta.dirname}/views/contact.html`);
})
app.get('/thank-you', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
})

//Start Server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
});