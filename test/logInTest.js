const request = require('supertest')
const app = require('../app')
const { assert } = require('chai')

 describe('POST /auth/signin', function () {
    it('Must respond with the name', function(){
        request(app)
            .post('/auth/signin')
            .send({
            mail:"alexeg147@gmail.com",
            password: "alejandro",
            from: 'form'
            })
            .then(response => {
                user = response.body.name
                assert.isString(response.body.name)
                done()
            })
    })

    it('Must respond with 400 status code', function(done){
        request(app)
            .post('/auth/signin')
            .send({
                mail:"alexeg147@gmail.com",
                password: "nosoyale",
                from: 'form'
            })
            .expect(400)
            done()
    })

    it('Must respond with 404 status code', function(done){
        request(app)
            .post('/auth/signin')
            .send({})
            .expect(404, done)
    })
})