const request = require('supertest')
const app = require('../app')
const { assert } = require('chai')

 describe('POST /itineraries/', function () {
    it('Must respond with the id', function(){
        request(app)
            .post('/itineraries')
            .send({
                name: "Tour with camels",
                user: "632a27c8db93c45ad8941006",
                city: "630ed7e6ebebecae1587b1b9",
                price: 50,
                tags: ["Camels"],
                duration: 4
            })
            .then(response => {
                assert(response.body)
                done()
            })
    })
})



describe(`GET /itineraries/632d5ac15807564375a45e51`, function () {
    it('Must respond with 200 status code', function(done){
        request(app)
            .get(`/itineraries/632d5ac15807564375a45e51`)
            .expect(200, done)
    })
})