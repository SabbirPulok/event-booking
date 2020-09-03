const Event = require('../../models/event');
const User = require('../../models/user');

const {transformEvent} = require('./merge');

module.exports = {
    events : async ()=>{
        try{
            const events = await Event.find()
                return events.map(event=>{
                    return transformEvent(event);
                })
            }
            catch(err){
                throw err;
            }
    },
    createEvent : async (args, req) =>{
        
        const {title,description,price,date} = args.eventInput;
        //console.log(title);
        if(!req.isAuth)
        {
            throw new Error("Unauthenticated!");
        }
        const event = new Event({
            title,
            description,
            price: +price,
            //+ is the fastest way to convert string to number
            //Parse the string date to JS string objects
            date : new Date(date),
            creator: req.userId
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
                eventCreated = transformEvent(result);
                const creator = await User.findById(req.userId)            
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
    }
}