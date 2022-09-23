/*
const request = require('supertest');
const app = require('../app')
const {assert} = require('chai')

let id = '';

describe('POST /cities', function() {
    it('Must respond with 201 status code', function(done) {
        request(app)
            .post('/cities')
            .send({
                city: 'Madrid2',
                country: 'Spain2',
                photo: 'https://images.wallpaperscraft.com/image/single/madrid_spain_exhibition_center_plaza_mayor_ifema_feria_de_madrid_98158_3840x2400.jpg', 
                population: 41000,
                fundation: 1080
            })
            // .expect(201, done) // way 1
            // .end(function(err, res){ //way 2
            //     if (err) return done(err); //2
            //     return done(); //2
            // })
            .then(response => { //way 3
                id = response.body.response; //3
                assert.isString(response.body.response); //3
                done() //3
            }) //3
    })
    it('Must respond with 400 status code', function(done) {
        request(app)
            .post('/cities')
            .send({})
            // .expect(400)
            // .end(function(err, res){
            //     if (err) return done(err);
            //     return done();
            // })
            .then(response => {
                // assert.isString(response.body.response);
                done()
            })
    })

    //afterEach()
})

describe(`DELETE /cities/${id}`, function() {
    it('Must respond with 200 status code', function(done){
        request(app)
            .delete(`/cities/${id}`)
            .expect(200, done)
    })
} )
*/