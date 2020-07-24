const bcrypt = require('bcryptjs')

const Event = require('../../models/event');
const User =  require('../../models/user');
const Booking  = require('../../models/booking');

//const { createSourceEventStream } = require('graphql');

//alternatively can use async await(await on be main promise)

const events = async eventIds =>{
    try{
        const events = await Event.find({_id : {$in : eventIds}}) //pool of ids on the $in operator
        return events.map(event=>{
            return {
                ...event._doc,
                 _id: event.id,
                 date : new Date(event._doc.date).toISOString(),
                creator:user.bind(this,event.creator)}
        })
    }    
    catch(err) {
        throw err;
    }
}
const user = userId => {
    return User.findById(userId)
    .then( user =>{
        return {
            ...user._doc,
            _id : user.id, 
            createdEvents : events.bind(this, user._doc.createdEvents)};
    })
    .catch(err =>{
        throw err;
    })
}
const singleEvent = async eventId =>{
    try{
        const event = await Event.findById(eventId);
        return {...event._doc, _id: event.id, creator:user.bind(this, event.creator)}
    }
    catch(err){
        throw err;
    }
}
module.exports = {
    events : async ()=>{
        try{
            const events = await Event.find()
            //.populate('creator')
                return events.map(event=>{
                    return {
                        ...event._doc,
                            _id:event.id,
                            date : new Date(event._doc.date).toISOString(),
                            creator: user.bind(this,event._doc.creator)
                        }; //remove metadata and make object id to be presentable
                })
            }
            catch(err){
                throw err;
            }
    },
    bookings : async ()=>{
        try{
            const bookings = await Booking.find()
            return bookings.map(booking=>{
                return {
                    ...booking._doc,
                    _id:booking.id,
                    user: user.bind(this.booking._doc.user),
                    event: singleEvent.bind(this, booking._doc.event), 
                    createdAt:new Date(booking._doc.createdAt).toISOString(),
                    updatedAt:new Date(booking._doc.updatedAt).toISOString()
                }
            })
        }
        catch(err){
            throw err;
        }
    },
    createEvent : async (args) =>{

        const {title,description,price,date} = args.eventInput;
        //console.log(title);
        
        const event = new Event({
            title,
            description,
            price: +price,
            //+ is the fastest way to convert string to number
            //Parse the string date to JS string objects
            date : new Date(date),
            creator: "5f106b7c3c433326806750d5"
        })
        let eventCreated;
        //save onto the database
        //should return event bcz express-graphql knows that this resolver executes an async operation at 
        //the end and it will wait for complete. Otherwise, it complete instantly and would therefore would
        //not get a valid result.
        try{
            const result = await event.save()
             // result is our event and result.id convert id to string by mongoose
            //._doc properties provided by mongoose which gives us all the core properties that make up our 
            //document from our object or event and leave out all the metadata
                eventCreated = {
                    ...result._doc,
                    _id:result.id,
                    date : new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, result._doc.creator)
                };
                const creator = await User.findById("5f106b7c3c433326806750d5")            
                if(!creator)
                {
                    throw new Error("User not found")
                }
                creator.createdEvents.push(event)
                await creator.save();
                return eventCreated;
            }
        catch(error) {            
            throw error;
        }
    },
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
    bookEvent: async (args) =>{
        const fetchEvent = await Event.findOne({_id:args.eventId});
        const booking = new Booking({
            user: "5f106b7c3c433326806750d5",
            event: fetchEvent
        });
        const result = await booking.save();
        return{
            ...result._doc,
            _id:result.id,
            user: user.bind(this.booking._doc.user),
            event: singleEvent.bind(this, booking._doc.event), 
            createdAt: new Date(result._doc.createdAt).toISOString(),
            updatedAt: new Date(result._doc.updatedAt).toISOString()
        }
    }
}