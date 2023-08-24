const canCreateMessage = (req,res, next) =>{
    if(req.cookies.canCreateMessage == true){
        return res.status(400).json({success: false, message  : 'You have wait 1 day to send new message'})
    }
    next()
}

export { canCreateMessage }
