//imports
import express from 'express';

//Create an express app
const app = express();

//Define PORT
const PORT= 3000;

//Static file serving

app.use(express.static('public'))


// Define our main route ('/')
app.get('/', (req,res)=>{
    res.sendFile(`${import.meta.dirname}/views/home.html`)
});

//Start Server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
});