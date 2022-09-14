const User = require('../models/User');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const sendMail = require('./sendMail');
const Joi = require('joi');

const validator = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(12).required(),
    lastName: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(12).required(),
    photo: Joi.string().uri().required(),
    country: Joi.string().min(4).max(56).required(),
    email: Joi.string().lowercase().email().required().error(new Error('INVALID_EMAIL')),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    role: Joi.string().min(3).max(15).required(),
    from: Joi.string().min(3).max(15).required()
})

const userController ={

    signUp: async(req, res) => {
        try{
            let result = await validator.validateAsync(req,body)
            let {name, photo, mail, password, role, from} = result;

            let user = await User.findOne({mail})

            if (!user){
                let logged = false;
                let verified = false;
                //code: clave unica de usuario o unique string.
                let code = crypto.randomBytes(15).toString('hex'); 
                
                if (from === 'form'){
                    // Hash: convertir una password en una password que nadie pueda saber que esta referenciada.
                    // No guardar passwords sin hacer hash.
                    password = bcryptjs.hashSync(password, 10); // 10: nvl seguridad.
                    user = await new User({name, photo, mail, password, role, from, logged, verified, code}).save();
                    sendMail(mail);
                    //Incorporar funcion para envio de mail de verificacion.
                    res.status(201).json({
                        message: "User signed up.",
                        success: true
                    });
                } else{
                    password = bcryptjs.hashSync(password, 10); // 10: nvl seguridad.
                    verified = false;
                    user = await new User({name, photo, mail, password, role, from: [from], logged, verified, code}).save();
                    //Incorporar funcion para envio de mail de verificacion.
                    res.status(201).json({
                        message: "User signed up.",
                        success: true
                    });
                }
                user = await new User({name, photo, mail, password, role, logged, verified, code}).save();
            } else {
                if (user.from.includes(from)){
                    res.status(200).json({
                        message: "User already registered",
                        success: false // Porque no completo el registro.
                    });
                } else{
                    user.from.push(from); //Agrego nuevo origen de registro.
                    user.verified = true;
                    user.password.push(bcryptjs.hashSync(password,10));
                    await user.save();
                    res.status(201).json({
                        message: "User signed up with " + from,
                        success: true
                    })
                }
            }
        }
        catch(error){
            console.log(error);
            res.status(400).json({
                message: "Couldn't signed up",
                success: false
            })
        }
    },
    verifyMail: async(req, res) => {

    },
    signIn: async(req, res) => {

    },
    signOut: async(req, res) => {
        const {mail} = req.body

        try {
            let user = await User.findOne({mail})
          
            user.loggedIn = false
            await user.save()
            
            res.status(200).json({
                message: 'singout successfull',
                success: true
            })

        } catch(error) {
            console.log(error);
            res.status(400).json({
                message: 'Failed to sign out',
                success: false
            })
        }
    },
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