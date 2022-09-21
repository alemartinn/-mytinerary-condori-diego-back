const Itinerary = require('../models/Itinerary');
const Joi = require('joi');
const { response } = require('express');

const validator = Joi.object({
    name: Joi.string().required().min(2).max(30).messages({
        'any.required': 'NAME_REQUIRED',
        'string.empty': 'NAME_REQUIRED',
        'string.min': 'NAME_TOO_SHORT',
        'string.max': 'NAME_TOO_LARGE'
    }),
    user: Joi.string().required(),
    city: Joi.string().required(),
    price: Joi.number().integer().min(0).max(100000).required().messages({
        'number.base': 'INVALID_PRICE',
        'any.required': 'PRICE_REQUIRED',
        'number.empty': 'PRICE_REQUIRED',
        'number.min': 'INVALID_MIN_PRICE',
        'number.max': 'PRICE_TOO_MUCH'
    }),
    likes: Joi.array(),
    tags: Joi.array().required().messages({
        'any.required': 'TAGS_REQUIRED',
        'array.empty': 'TAGS_REQUIRED'
    }),
    duration: Joi.number().min(0).max(12).required().messages({
        'any.required': 'DURATION_REQUIRED',
        'number.empty': 'DURATION_REQUIRED',
        'number.min': 'INVALID_MIN_DURAT',
        'number.max': 'DURAT_TOO_MUCH'
    }),
    description: Joi.string().min(5).max(500).messages({
        'any.required': 'DESCR_REQUIRED',
        'string.empty': 'DESCR_REQUIRED',
        'string.min': 'DESCR_TOO_SHORT',
        'string.max': 'DESCR_TOO_LARGE'
    })
})

const itineraryController ={
    createItinerary: async(req, res) => {
        try{
            const result = await validator.validateAsync(req.body);
            console.log(result);
            let itineraryCreated = await new Itinerary(result).save();
            res.status(201).json({
                message: 'The itinerary has been created.',
                response: itineraryCreated._id,
                success: true
            });
        } catch(error){
            res.status(400).json({
                message: error.details[0].message, //"Sorry but we couldn't create the itinerary. Try it again.",
                success: false,
                response: null
            });
        }
    },
    getAllItineraries: async(req, res) => {
        //const {city} = req.query;
        let query = {}
        if(req.query.city) {query.city = req.query.city}
        if (req.query.user) {query.user = req.query.user}
        try{
            let itinerariesFounded = await Itinerary.find(query).populate("city", {city: 1, photo: 1})
            .populate('user', {name: 1, lastName: 1, photo:1, country: 1})

            if(itinerariesFounded){
                res.status(200).json({
                    message: "Now you get the itineraries",
                    response: itinerariesFounded,
                    success: true
                })
            } else{
                res.status(404).json({
                    message: "We couldn't find itineraries",
                    success: true
                })
            }
        }
        catch(error){
            console.log(error)
            res.status(400).json({
                message: "We couldn't get the itineraries, try it again.",
                response: null,
                success: false
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
    },
    deleteItinerary: async(req, res) => {
        let {id} = req.params;
        
        try{
            let itineraryDeleted = await Itinerary.findByIdAndRemove(id);

            if (itineraryDeleted) {
                res.status(200).json({
                    message: "You deleted the itinerary.",
                    response: itineraryDeleted,
                    success: true
                });
            } else {
                res.status(400).json({
                    message: "There isn't itinerary to delete.",
                    response: itineraryDeleted,
                    success: false
                });
            }
        } catch(error){
            console.log(error);
            res.status(400).json({
                message: "We couldn't delete the itinerary, try it again.",
                success: false
            });
        }
    }
}

module.exports = itineraryController;