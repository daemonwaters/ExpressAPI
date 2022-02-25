const express = require('express');
const router = express.Router();
let data = require('../Data/Data');




router.get('/',(req,res)=>{
    res.json(data);
})


router.get('/:id',(req,res)=>{
    const requestedUserId = parseInt(req.params.id)
    const userExists = data.some(user=> user.id === requestedUserId)
    if(!userExists){
        res.status(404).json({message:`The users with the id of ${requestedUserId} does not exist...`})
        return;
    }
    const toBeSentData = data.find(user=> user.id === requestedUserId);
    res.json(toBeSentData);
})


router.post('/',(req,res)=>{
    const sentUser = req.body;
    if(sentUser.id){
        data.push(sentUser)
    }else{
        sentUser.id = data.length + 1;
        data.push(sentUser);
    }
    res.status(201).json(sentUser);
})



router.put('/:id',(req,res)=>{
    const requestedUserData = req.body;
    const newUserId = parseInt(req.params.id);
    const userExists = data.some(user=> user.id === newUserId)
    if(!userExists){
        res.status(400).json({message:`The user with the id of ${req.params.id} does not exist...`})
        return;
    }
    const targetUser = data.findIndex(user => user.id === newUserId);
    requestedUserData.id = newUserId
    data[targetUser] = requestedUserData
    res.json(requestedUserData);
})



router.patch('/:id',(req,res)=>{
    const newData = req.body;
    const requestedUserId = parseInt(req.params.id)
    const targetUser = data.find(user => user.id === requestedUserId);
    if(!targetUser){
        res.status(400).json({message:`The user with the id of ${req.params.id} does not exist...`})
        return;
    }

    for(const [key,value] of Object.entries(newData)){
        targetUser[key] = value
    }
    res.end()
})


router.delete('/:id',(req,res)=>{
    const uid = parseInt(req.params.id);
    const exist = data.find(user=> user.id === uid);
    if(!exist){
        res.status(400).json({message:`The user with the id of ${req.params.id} does not exist...`})
        return;
    }
    
    data = data.filter(user=> user.id !== uid);
    res.end()
})



module.exports = router;