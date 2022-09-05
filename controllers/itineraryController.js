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
    },
    updateItinerary: async(req, res) => {
        const {id} = req.params;
        const mytinerary = req.body;

        try{
            let itinerary = await Itinerary.findOneAndUpdate({_id: id}, mytinerary, {new: true})
            if(itinerary) {
                res.status(200).json({
                    message: "Your itinerary has been updated",
                    response: itinerary,
                    success: true
                })
            } else {
                res.status(400).json({
                    message: "There isn't itinerary to update",
                    response: itinerary,
                    success: false
                })
            }
        } catch(error) {
            console.log(error);
            res.status(400).json({
                message: "We couldn't update the itinerary, try it again",
                success: false
            })
        }
    }
}

module.exports = itineraryController;