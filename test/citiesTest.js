const request = require('supertest');
const app = require('../app')
const {assert} = require('chai')

describe('POST /cities', function() {
    it('Must respond with 201 status code', function(done) {
        request(app)
            .post('/cities')
            .send({
                city: 'Madrid',
                country: 'Spain',
                photo: 'https://images.wallpaperscraft.com/image/single/madrid_spain_exhibition_center_plaza_mayor_ifema_feria_de_madrid_98158_3840x2400.jpg', 
                population: 41000,
                fundation: 1080
            })
            .then(response => {
                assert.isString(response.body.response)
                done()
            })
            // .expect(201, done) // 1
            // .end(function(err, res){ //2
            //     if (err) return done(err); //2
            //     return done(); //2
            // })
    })
    it('Must respond with 400 status code', function(done) {
        request(app)
            .post('/cities')
            .send({})
            .expect(400)
            .end(function(err, res){
                if (err) return done(err);
                return done();
            })
    })

    //afterEach()
})