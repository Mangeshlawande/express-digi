//entry point 

//npm run start

// code in modular fashion 
// 1. require  2. import 
// type :: common js , module 

import express from 'express';

const app = express();


const port = 3000;
/** 
app.get("/", (req,res) =>{
    res.send("helloo from flash & his tea !!")
})

app.get("/ice-tea", (req,res) =>{
    res.send("What ice tea would you prefer ?")
})

app.get("/twitter", (req,res) =>{
    res.send("mangeshdotcom")
})

// "dev": "nodemon index.js"
*/

//using middlewares
//accept data from front end which is in json format 
// 

app.use(express.json())// 

let teaData =[];
let nextId  = 1;
// add tea 
// to save data in database use post is better 
app.post('/teas', (req,res) =>{
    const {name, price} = req.body
    const newTea = { id: nextId++, name, price}
    teaData.push(newTea);
    res.status(201).send(newTea);
})
//  get all tea 
app.get('/teas', (req,res) =>{

    res.status(200).send(teaData);
})

// get a tea with id 
app.get('/teas/:id', (req,res) =>{
    // params :: anything comes from the url called it params 
     let tea = teaData.find(t=> t.id === parseInt(req.params.id))
     if(!tea){
        return res.status(404).send('tea not found !!');
     }
    res.status(202).send(tea);
})

// update tea 
app.put('/teas/:id', (req, res) =>{
    let tea = teaData.find(t=> t.id === parseInt(req.params.id))    
    if(!tea){
        return res.status(404).send('tea not found !!');
     }
// business logic 
     const {name, price }  =  req.body
     tea.name = name 
     tea.price = price
    res.status(202).send(tea);
})

// delete tea 

app.delete('/teas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send("Invalid ID");
    }

    console.log("teaData:", teaData);
    console.log("Parsed ID:", id);

    const index = teaData.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).send("Tea not found!!");
    }
    console.log('Deleted item index:', index);
    
    teaData.splice(index, 1);
    return res.status(204).send('deleted');
});



app.listen(port, () => {
    console.log(`Server is running at port ${port}...`);
})