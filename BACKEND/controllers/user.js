exports.create =(req, res) => {
    console.log(req.body);
    // get the resp json data request by the user 
    res.json({user:req.body})
}

