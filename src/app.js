
const express = require('express');
const app = express()
const subscribers= require("./models/subscribers")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Your code goes here
app.get('/subscriber', async(req, res)=>{
  try {
const data= await subscribers.finds()
console.log('data fetched!')
res.status(200).json(data)
 } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal serve error!'})
  }
})

app.get("/subscribers/names", async(req, res)=>{
  try {
    const subscribers= await subscribers.find({}).select({name:1, subscribedChannel:1, _id:0})
  } catch (ex) {
    res.status(200), json({error: ex.message})
  }
})
app.get("/subscribers/:id", async(req, res)=>{
  const idToGet =req.params.id
  try {
    const subscribers= await subscribers.findById(idToGet, {__v:0})
    if (!subscribers) res.sendStatus(404)
      res.status(200).json(subscribers)
  } catch (error) {
    res.status(404).json({error: ex.message})
  }
})

module.exports = app;
