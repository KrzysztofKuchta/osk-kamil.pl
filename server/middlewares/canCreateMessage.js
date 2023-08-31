const canCreateMessage = (req,res, next) =>{
   const canCreateMessage = req.cookies.canCreateMessage
    if(canCreateMessage ){
        return res.status(400).json({success : false, message : "Wait 1 day!"})
    }
    next()
}

export { canCreateMessage }
