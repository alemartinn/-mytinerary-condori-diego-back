const Itinerary = require('../models/Itinerary');

const itineraryController ={
    createItinerary: async(req, res) => {
        const {name, user, city, price, likes, tags, duration} = req.body;
        try{
            let itineraryCreated = await new Itinerary({name, user, city, price, likes, tags, duration}).save();
            res.status(201).json({
                message: 'The itinerary has been created.',
                response: itineraryCreated._id,
                success: true
            });
        } catch(error){
            res.status(400).json({
                message: "Sorry but we couldn't create the itinerary. Try it again." 
            });
        }
    }
}

module.exports = itineraryController;