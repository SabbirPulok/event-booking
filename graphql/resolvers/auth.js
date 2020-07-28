const bcrypt = require('bcryptjs')
const User =  require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser : (args)=>{
        const {email,password} = args.userInput;
        return User.findOne({email})
        .then(user=>{
            if(user){
                throw new Error("User exists already.")
            }
            return bcrypt.hash(password,12);
        })
        .then(hPass=>{
            const user = new User({
                email,
                password:hPass
            })
            return user.save()
        })
        .then(result =>{
            return {...result._doc, _id : result.id, password:null}
        })
        .catch(err=>{throw err})
    },
    login : async ({email,password}) =>{
        const user = await User.findOne({email:email})
        if(!user){
            throw new Error('User does not exist.');
        }
        const isEqual = await bcrypt.compare(password, user.password) //Compare User DB Table hashed passowrd with incoming password
        if(!isEqual)
        {
            throw new Error("Password does not match.");
        }
        const token = jwt.sign({userId: user.id, email: user.email}, 'secretprivatekey', {
            expiresIn: '1h'
        })

        return { userId: user.id, token : token, tokenExpiration : 1};
    }
}