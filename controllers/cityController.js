
const City = require('../models/City'); //Requerimos el modelo

const cityController = {
    createCity: async(req , res) => {
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
    readCity: async(req, res) => {
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
            const str = req.query.city;
            const str2 = str.charAt(0).toUpperCase() + str.slice(1);
            query.city = { $regex: '^' + str2, $options: 'i' };
        }
        if(req.query.country){
            const str = req.query.country;
            const str2 = str.charAt(0).toUpperCase() + str.slice(1);
            // const regex = new RegExp(str2, 'i');
            query.country = { $regex: '^' + str2, $options: 'i' };
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
    },
    updateCity: async (req, res) => {

        const { id } = req.params;
        const {city,country,photo, population, fundation} = req.body;
        console.log('line 94', city, country, photo, population, fundation);

        // var query = {};
        
        // if(req.query.city){
        //     const str = req.query.city;
        //     const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        //     query.city = str2;
        // }
        // if(req.query.country){
        //     const str = req.query.country;
        //     const str2 = str.charAt(0).toUpperCase() + str.slice(1);
        //     query.country = str2;
        // }
        // if(req.query.population){
        //     query.population = req.query.population;
        // }
        // if(req.query.fundation){
        //     query.fundation = req.query.fundation;
        // }

        try {
            let city = await City.findOneAndUpdate({ _id: id }, req.body, { new: true })
            // let city = await City.findOneAndUpdate({ _id: id }, query, { new: true })
            if (city) {
                res.status(200).json({
                    message: "You updated one city",
                    response: city,
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "There isn't city to update",
                    success: false
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "We couldn't delete the city, try it again",
                success: false
            })
        }
    },
    deleteCity: async(req, res) => {
        let {id} = req.params;
        console.log(req.params)
        try{
            let cityDeleted = await City.findByIdAndRemove(id);

            if (cityDeleted) {
                res.status(200).json({
                    message: "You deleted the city.",
                    response: cityDeleted,
                    success: true
                });
            } else {
                res.status(404).json({
                    message: "There isn't city to delete.",
                    response: cityDeleted,
                    success: true
                });
            }

        } catch(error){
            console.log(error);
            res.status(400).json({
                message: "We couldn't delete the city, try it again.",
                response: null,
                success: false
            });
        }
    }

}

module.exports = cityController;

//Finalmente ponerlo en routes.