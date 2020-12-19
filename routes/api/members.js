const express = require('express');
const { parse } = require('uuid');
const router = express.Router();
const members = require("../Members");
const uuid = require("uuid");

// Gets all Members
router.get("/", (req, res) => {
    res.json(members);
});


// Get One Member
router.get("/:id", (req, res) => {
    console.log(req.params.id)
    console.log(members)
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `Member with Id ${req.params.id} not Found!`})
    }

});


// Create Member
router.post("/", (req, res) => {
    console.log(req.body)
    const newMember = {
        id: uuid.v4(),
        name: req.body.name
    };

    if(!newMember.name){
        res.status(400).json({msg: "Name is required Field!"});
        
    } else {

        if(members.some(member => member.name === newMember.name)){
            req.body.name_id ? res.redirect('/') : res.status(400).json({msg: `${newMember.name} is already in Database!`});
        } else {
            members.push(newMember);
            req.body.name_id ? res.redirect('/') : res.json(newMember);
        };
    }
    console.log(members)
});



// Update Member
router.put("/:id", (req, res) => {
    console.log(members)
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const newName = req.body.name;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){

                // Below we will also check if there is name in req.body 
                // or else we will use previous name, Using Trenary Operator
                member.name = newName? newName : member.name;
                res.json(member)
            }
        });
    } else {
        res.status(400).json({msg: `Member with Id ${req.params.id} not Found!`})
    };

});


// Delete Member
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    let hero = 0;
    
    if (found){
        let having = 0;
        members.forEach((value, i) => {
            if(value.id === parseInt(req.params.id)){
                having = i;
            }
        });

        // User Ternary Operator
        having===0? null : members.splice(having, having);
        // OR
        // New method of condition true without else like in ternary
        // having!==0 && members.splice(having, having);
        res.json(having)

    } else {
        res.status(400).json({ error: "No member found!"})
    }
});

module.exports = router