//Are we return a valid token from frontend
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader)
    {
        req.isAuth = false;
        //request continues it's journey with next call but we rewrite the isAuth field as false.
        return next();
    }
    const token = authHeader.split(' ')[1] ; //Bearer token
    if(!token || token ==='')
    {
        req.isAuth = false;
        return next();
    }
    let decodeToken;
    try{
        decodeToken = jwt.verify(token, "secretprivatekey");
    }
    catch(err)
    {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodeToken.userId;
    next();

}