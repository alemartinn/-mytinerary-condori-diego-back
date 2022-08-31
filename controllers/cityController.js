
const City = require('../models/City'); //Requerimos el modelo

const eventController = {
    create: async(req , res) => {
        const {city,country,photo, population, fundation} = req.body;
        try{
            //crear objeto con new City y debemos guardar con .save()
            await new City({city,country,photo,population, fundation}).save();
            //configurar respuesta
            res.status(201).json({
                message: 'The City has been created.',
                success: true
            });
        } catch(error){
            res.status(400).json({
                message: "Sorry but we couldn't create the city. Try it again."
            });
        }
    },
    read: async(req, res) => {
        let {id} = req.params; //Pasamos el id en los parametros de URL.
        try{
            let cityFounded = await City.findOne({_id: id});
            
            if (cityFounded) {
                res.status(200).json({
                    message: "Now you get a city.",
                    response: cityFounded,
                    success: true
                });
            } else {
                res.status(404).json({
                    message: "There isn't a city with that name.",
                    response: cityFounded,
                    success: true
                });
            }
        } catch(error){
            console.log(error);
            res.status(400).json({
                message: "We couldn't get the city, try it again.",
                response: null,
                success: false
            });
        }
    },
    readAll: async(req, res) => {

        var query = {};
        
        if(req.query.id){
            query._id = req.query.id;
        }

        if(req.query.city){
            query.city = req.query.city;
        }
        if(req.query.population){
            query.population = req.query.population;
        }
        if(req.query.fundation){
            query.fundation = req.query.fundation;
        }

        try{
            let allCities = await City.find(query);

            if (allCities) {
                res.status(200).json({
                    message: "Now you get all the cities.",
                    response: allCities,
                    success: true
                });
            } else {
                res.status(404).json({
                    message: "There isn't cities.",
                    response: allCities,
                    success: true
                });
            }

        } catch(error){
            console.log(error);
            res.status(400).json({
                message: "We couldn't get the cities, try it again.",
                response: null,
                success: false
            });
        }
    }
}

module.exports = eventController;

//Finalmente ponerlo en routes.