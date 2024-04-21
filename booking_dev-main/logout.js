//Get package
const express = require("express");
//Router
const router = express.Router();
//Path
const path = require("path");

router.get('/logout',function(req,res){
    //Clear session
    req.session.destroy(function(err){
        if(err){
            console.err(err.massage);
            res.status(500).send("Cannot clear session")
        }else{
            res.redirect('/')
        }
    })
})

module.exports = router;