const bcrypt = require('bcryptjs')
const User =  require('../../models/user');

//const { createSourceEventStream } = require('graphql');

//alternatively can use async await(await on be main promise)

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
    }
}