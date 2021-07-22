const express = require('express'); 
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.render('../views/pages/home',{
        title: "Home",
        
    });
});

module.exports = router