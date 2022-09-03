const User = require('../models/User');

const userController ={
    createUser: async(req, res) => {
        const {name,lastName, mail, password, photo, country} = req.body;
        try{
            let userCreated = await new User({name,lastName, mail, password, photo, country}).save();
            res.status(201).json({
                message: 'The User has been created.',
                response: userCreated._id,
                success: true
            });
        } catch(error){
            res.status(400).json({
                message: "Sorry but we couldn't create the user. Try it again." 
            });
        }
    },
    readUser: async(req, res) => {
        let {id} = req.params;
        try{
            let userFounded = await User.findOne({_id: id});

            if (userFounded) {
                res.status(200).json({
                    message: "Here you have the user.",
                    response: userFounded,
                    success: true
                });
            } else {
                res.status(404).json({
                    message: "There isn't a user with that name.",
                    response: userFounded,
                    success: true
                })
            }
        } catch(error){
            console.log(error);
            res.status(400).json({
                message: "We couldn't get the user, try it again.",
                response: null,
                success: false
            });
        }
    },
    updateUser: async(req, res) => {
        const {id} = req.params;
        const myUser = req.body;

        try{
            let user = await User.findOneAndUpdate({_id: id}, myUser, {new: true})
            if(user) {
                res.status(200).json({
                    message: "Your user has been updated",
                    response: user,
                    success: true
                })
            } else {
                res.status(400).json({
                    message: "There isn't user to update",
                    response: user,
                    success: false
                })
            }
        } catch(error) {
            console.log(error);
            res.status(400).json({
                message: "We couldn't update the user, try it again",
                success: false
            })
        }
    },
    deleteUser: async(req, res) => {
        let {id} = req.params;
        
        try{
            let userDeleted = await User.findByIdAndRemove(id);

            if (userDeleted) {
                res.status(200).json({
                    message: "You deleted the user.",
                    response: userDeleted,
                    success: true
                });
            } else {
                res.status(400).json({
                    message: "There isn't user to delete.",
                    response: userDeleted,
                    success: false
                });
            }
        } catch(error){
            console.log(error);
            res.status(400).json({
                message: "We couldn't delete the user, try it again.",
                success: false
            });
        }
    }
}

module.exports = userController;