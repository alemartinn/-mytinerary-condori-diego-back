const User = require('../models/User');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const sendMail = require('./sendMail');
const Joi = require('joi');
const jwt = require('jsonwebtoken')

const validator = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
        'any.required': 'NAME_REQUIRED',
        'string.empty': 'NAME_REQUIRED',
        'string.min': 'NAME_TOO_SHORT',
        'string.max': 'NAME_TOO_LARGE'
    }),
    lastName: Joi.string().min(3).max(100).messages({
        'string.min': 'LASTNAME_TOO_SHORT',
        'string.max': 'LASTNAME_TOO_LARGE'
    }),
    photo: Joi.string().uri().required().messages({
        'any.required': 'PHOTO_REQUIRED',
        'string.empty': 'PHOTO_REQUIRED',
        'string.uri': 'INVALID_URL'
    }),
    country: Joi.string().min(4).max(100),
    email: Joi.string().email().required().messages({
        'any.required': 'EMAIL_REQUIRED',
        'string.empty': 'EMAIL_REQUIRED',
        'string.email': 'INVALID_EMAIL'
    }),
    password: Joi.string().required().min(8).max(50).messages({
        'any.required': 'PASS_REQUIRED',
        'string.empty': 'PASS_REQUIRED',
        'string.min': 'PASS_TOO_SHORT',
        'string.max': 'PASS_TOO_LARGE',
    }),
    role: Joi.string().required().valid('user', 'admin').messages({
        'any.required': 'ROLE_REQUIRED',
        'string.empty': 'ROLE_REQUIRED',
        'any.only': 'ROLE_NOT_ALLOWED'
    }),
    from: Joi.string().required().messages({
        'any.required': 'FROM_REQUIRED',
        'string.empty': 'FROM_REQUIRED'
    })
})

const userController ={

    signUp: async(req, res) => {
        try{
            let result = await validator.validateAsync(req.body)
            let {name, lastName, email, password, photo, country, role, from} = result;

            let user = await User.findOne({email})

            if (!user){
                // let code: unique key of user or unique string.
                let code = crypto.randomBytes(15).toString('hex'); 
                let loggedIn = false;
                let verified = false;
                
                if (from === 'form'){
                    // Hash or hashing: This converts a password on a secure password who any human can't translate it or reference it. 
                    // Don't save passwords without hash it previously.
                    password = bcryptjs.hashSync(password, 10); // Level security 10.
                    user = await new User({name, lastName, email, password, photo, country, role, from, loggedIn, verified, code}).save();
                    //Incorporate function to send a verification email.
                    sendMail(email, code);
                    res.status(201).json({
                        message: "User signed up.",
                        response: {
                            name,
                            lastName,
                            email,
                            photo,
                            role,
                            verified
                        },
                        success: true
                    });
                } else{
                    password = bcryptjs.hashSync(password, 10); // Level security 10.
                    verified = true;
                    user = await new User({name, lastName, email, password, photo, country, role, from: [from], loggedIn: loggedIn, verified, code}).save();
                    res.status(201).json({
                        message: "User signed up.",
                        response: {
                            name,
                            lastName,
                            email,
                            photo,
                            role,
                            verified
                        },
                        success: true
                    });
                }
            } else {
                if (user.from.includes(from)){
                    res.status(200).json({
                        message: "User already registered with that email",
                        success: false // Because doesn't complete the register.
                    });
                } else{
                    user.from.push(from); //Add new register origin.
                    user.verified = true;
                    user.password.push(bcryptjs.hashSync(password,10));
                    await user.save();
                    res.status(201).json({
                        message: "User signed up with " + from,
                        response: {
                            name,
                            lastName,
                            email,
                            photo,
                            role,
                            verified
                        },
                        success: true
                    });
                }
            }
        }
        catch(error){
            console.log(error);
            res.status(400).json({
                message: error.details[0].message,
                response: error,
                success: false
            });
        }
    },
    //unique and random code generated by signup method
    verifyMail: async(req, res) => {
        
        const {code} = req.params;
        let userFounded = await User.findOne({code});

        try{
            if (userFounded){
                userFounded.verified = true;
                await userFounded.save();
                res.status(200).redirect('http://localhost:3000/verified-account');
            } else {
                res.status(404).json({
                    message: "This email has not a vinculed account yet",
                    success: false
                });
            }
        }
        catch(error){
            console.log(error);
            res.status(400).json({
                message: "Something failed, try it again",
                success: false
            });
        }
    },
    verifyToken: async(req,res) => {
        //console.log(req.user)
        if (!req.err) {
        res.status(200).json({
            message:"Hi! Welcome back "+req.user.name,
            response: req.user,
            success: true
        })
        } else {
            res.status(200).json({
                message:"Sign in please!" ,
                success: false
            })
        }
    },
    //Method to sign in an user.
    signIn: async(req, res) => {
        
        const {email, password, from} = req.body;
        
        try {
            const user = await User.findOne({email});

            if(!user){
                res.status(404).json({
                    message: "Please, send an email and password correctly",
                    success: false
                })
            } else if (!user.verified){
                res.status(400).json({
                    message: "You have created an account, please verify it with your email",
                    success: false
                })
            } else {
                //Compare each element(password from db)
                const checkPass = user.password.filter(element=> bcryptjs.compareSync(password, element));
                if (from === 'form'){
                    if(checkPass.length > 0){

                        const userLogged = {
                            id: user._id,
                            name: user.name,
                            lastName: user.lastName,
                            photo: user.photo,
                            country: user.country,
                            email: user.email,
                            role: user.role,
                            from: user.from
                        }
                        user.loggedIn = true;
                        await user.save();
                        const token = jwt.sign({id: user._id}, process.env.KEY_JWT, {expiresIn: 60*60*24})
                        res.status(200).json({
                            message: 'Welcome '+user.name,
                            response: {token: token, user: userLogged},
                            success: true
                        });
                    }
                    else{
                        res.status(400).json({
                            message: "User or password incorrect",
                            success: false
                        });
                    }
                } else {
                    if(checkPass.length > 0){
                        const userLogged = {
                            id: user._id,
                            name: user.name,
                            lastName: user.lastName,
                            photo: user.photo,
                            country: user.country,
                            email: user.email,
                            role: user.role,
                            from: user.from
                        }
                        user.loggedIn = true;
                        await user.save();
                        const token = jwt.sign({id: user._id}, process.env.KEY_JWT, {expiresIn: 60*60*24})
                        res.status(200).json({
                            message: 'Welcome ' + user.name,
                            response: {token: token, user: userLogged},
                            success: true
                        });
                    }
                    else{
                        res.status(400).json({
                            message: "Invalid credentials",
                            success: false
                        });
                    }
                }
            }
        }
        catch(error){
            console.log(error);
            res.status(400).json({
                message: error.details[0].message,
                response: error,
                success: false
            });
        }
    },
    signOut: async(req, res) => {
        const {email} = req.body
        try {
            let user = await User.findOne({email})
          
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
    updateUser: async(req, res) => {
        const {id} = req.params;

        try{
            let user = await validator.validateAsync(req.body);
            let {name, lastName, password, photo, country} = user;
            passwordHashed = bcryptjs.hashSync(password, 10); // Level security 10.
            let userUpdated = await User.findOneAndUpdate({_id: id}, {name, lastName, passwordHashed, photo, country}, {new: true})
            if(userUpdated) {
                const myUserUpdated = {
                    id: userUpdated._id,
                    name: userUpdated.name,
                    lastName: userUpdated.lastName,
                    photo: userUpdated.photo,
                    country: userUpdated.country,
                    email: userUpdated.email,
                    role: userUpdated.role,
                    from: userUpdated.from
                };
                res.status(200).json({
                    message: "Your user has been updated.",
                    response: myUserUpdated,
                    success: true
                });
            } else {
                res.status(404).json({
                    message: "We couldn't find the user to update.",
                    response: null,
                    success: false
                });
            }
        } catch(error) {
            console.log(error);
            res.status(400).json({
                message: error.details[0].message,
                success: false
            });
        }
    }
}

module.exports = userController;