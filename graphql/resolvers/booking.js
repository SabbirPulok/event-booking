const Event = require('../../models/event');
const Booking  = require('../../models/booking');
const {transformBooking, transformEvent} = require('./merge');

//const { createSourceEventStream } = require('graphql');

//alternatively can use async await(await on be main promise)

module.exports = {
    bookings : async ()=>{
        try{
            const bookings = await Booking.find()
            return bookings.map(booking=>{
                return transformBooking(booking);
            })
        }
        catch(err){
            throw err;
        }
    },
    bookEvent: async (args) =>{
        const fetchEvent = await Event.findOne({_id:args.eventId});
        const booking = new Booking({
            user: "5f106b7c3c433326806750d5",
            event: fetchEvent
        });
        const result = await booking.save();
        return transformBooking(result);
    },
    cancelBooking : async (args) =>{
        try{
            const booking = await Booking.findById({_id : args.bookingId}).populate('event')
            const event = transformEvent(booking.event);
            await Booking.deleteOne({_id : args.bookingId})
            return event;
        }
        catch(err)
        {
            throw err;
        }
    }
}