const { assert } = require('chai');
const request = require('supertest');
const { response } = require('../app');
const app = require('../app')

describe('GET /cities/:id', function() {
    it('Respond with city objet', function(done) {
      request(app)
        .get('/cities/630ed8d5b576af8e303593c3')
        .then(response => {
            assert(response.body)
            console.log(response.body)
            done()
        })
    });
});