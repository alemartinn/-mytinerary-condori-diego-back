const Comment = require('../models/Comment');
const Joi = require('joi');

const validator = Joi.object({
    comment: Joi.string().required().min(3).max(350).messages({
        'any.required': 'COMMENT_REQUIRED',
        'string.empty': 'COMMENT_REQUIRED',
        'string.min': 'COMMENT_TOO_SHORT',
        'string.max': 'NAME_TOO_LARGE'
        }),
    user: Joi.string().required().messages({
        'any.required': 'USER_REQUIRED',
        'string.empty': 'USER_REQUIRED'
        }),
    itinerary: Joi.string().required().messages({
         'any.required': 'ITINERARY_REQUIRED',
         'string.empty': 'ITINERARY_REQUIRED'
        })
})

const commentController = {
    createComment: async(req, res) => {
        const result = await validator.validateAsync(req.body);
        const {comment, user, itinerary} = result;
        try{
            await new Comment({comment, user, itinerary}).save()
            res.status(201).json({
                message: "Comment created",
                success: true
            })
        } catch (error) {
            res.status(400).json({
                message: "Could't create comment",
                success: false
            })
        }
    },
    getAllComments: async(req, res) => {
        let query = {}
        if (req.query.itinerary) {
            query.itinerary = req.query.itinerary
        }
        
        try{
            let comments = await Comment.find(query)
                .populate('user', {name:1, photo:1, country:1})
                .populate('itinerary')
            if(comments) {
                res.status(200).json({
                    message: "You get comments",
                    response: comments,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Couldn't find comments",
                    success: flase
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: 'ERROR',
                success: false
            })
        }
    },
    getComment: async (req, res) => {
        const { id } = req.params
        try {
            let comment = await Comment.findOne({ _id: id })
            if (comment) {
                res.status(200).json({
                    message: 'You get one comment',
                    response: comment,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Couldn't find comment",
                    success: false
                })
            }
        } catch (error) {
            res.status(400).json({
                message: 'error',
                success: false
            })
        }
    },
}
module.exports = commentController