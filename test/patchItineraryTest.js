const request = require('supertest');
const app = require('../app')


describe('PATCH /itineraries/:id', function() {
    it('Respond with 200 status code', function(done) {
      request(app)
        .patch('/itineraries/6319d9d9d227c639cd7b6733')
        .send({
            name:"Update Itinerary",
            user:"6319b98af587b99d89bf4e20",
            city:"630ed8d5b576af8e303593c3",
            price:12,
            likes:["6319b98af587b99d89bf4e20"],
            tags:["#test"],
            duration:2,
            description:"This is itinerary for test",
        })
        .expect(200, done);
    });
});