
const Activity = require('../models/Activity');

const activityController = {
    getAllActivities: async(req, res) => {
        const {itinerary} = req.query;
        try{
            let activtFounded = await Activity.find({itinerary: itinerary}).populate("itinerary");
            if(activtFounded){
                res.status(400).json({
                    message: "Now you get the activities",
                    response: activtFounded,
                    success: true
                })
            } else{
                res.status(404).json({
                    message: "We couldn't find the activities",
                    success: true
                })
            }
        }
        catch(error){
            console.log(error)
            res.status(400).json({
                message: "We couldn't get the activities, try it again.",
                response: null,
                success: false
            });
        }
}
}

module.exports = activityController;