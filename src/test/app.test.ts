import chai from 'chai'
import chaiHttp from 'chai-http'

import { TasksApp } from '../tasks_app'

chai.use(chaiHttp)

describe('TasksApp', () => {
    const tasksApp = new TasksApp()

    before((done: Mocha.Done) => {
        tasksApp.start().then(() => {
            done()
        })
    })

    it('POST /tasks', (done: Mocha.Done) => {
        chai.request(tasksApp.app)
            .post('/tasks')
            .send({
                name: 'task1 name',
                description: 'task1 description',
                isDone: false
            })
            .then((result: ChaiHttp.Response) => {
                chai.assert.exists(result)
                chai.assert.equal(result.status, 200)
                chai.assert.isNumber(result.body.id)
                chai.assert.equal(result.body.id, 1)
                chai.assert.isString(result.body.name)
                chai.assert.equal(result.body.name, 'task1 name')
                chai.assert.isString(result.body.description)
                chai.assert.equal(result.body.description, 'task1 description')
                chai.assert.isBoolean(result.body.isDone)
                chai.assert.equal(result.body.isDone, false)
                done()
            })
    })

    it('GET /tasks', (done: Mocha.Done) => {
        chai.request(tasksApp.app)
            .get('/tasks')
            .then((result: ChaiHttp.Response) => {
                chai.assert.exists(result)
                chai.assert.equal(result.status, 200)
                chai.assert.lengthOf(Array.from(result.body), 1)
                done()
            })
    })

    it('GET /task/:id', (done: Mocha.Done) => {
        chai.request(tasksApp.app)
            .get('/task/1')
            .then((result: ChaiHttp.Response) => {
                chai.assert.exists(result)
                chai.assert.equal(result.status, 200)
                chai.assert.isNumber(result.body.id)
                chai.assert.equal(result.body.id, 1)
                chai.assert.isString(result.body.name)
                chai.assert.equal(result.body.name, 'task1 name')
                chai.assert.isString(result.body.description)
                chai.assert.equal(result.body.description, 'task1 description')
                chai.assert.isBoolean(result.body.isDone)
                chai.assert.equal(result.body.isDone, false)
                done()
            })
    })

    it('PUT /task/:id', (done: Mocha.Done) => {
        chai.request(tasksApp.app)
            .put('/task/1')
            .send({ isDone: true })
            .then((result: ChaiHttp.Response) => {
                chai.assert.exists(result)
                chai.assert.equal(result.status, 200)
                chai.assert.isNumber(result.body.id)
                chai.assert.equal(result.body.id, 1)
                chai.assert.isString(result.body.name)
                chai.assert.equal(result.body.name, 'task1 name')
                chai.assert.isString(result.body.description)
                chai.assert.equal(result.body.description, 'task1 description')
                chai.assert.isBoolean(result.body.isDone)
                chai.assert.equal(result.body.isDone, true)
                done()
            })
    })

    it('DELETE /task/:id', (done: Mocha.Done) => {
        chai.request(tasksApp.app)
            .delete('/task/1')
            .then((result: ChaiHttp.Response) => {
                chai.assert.exists(result)
                chai.assert.equal(result.status, 200)
                done()
            })
    })

    it('GET /task/:id', (done: Mocha.Done) => {
        chai.request(tasksApp.app)
            .get('/task/1')
            .then((result: ChaiHttp.Response) => {
                chai.assert.exists(result)
                chai.assert.equal(result.status, 500)
                done()
            })
    })

    after(() => {
        tasksApp.server.close()
    })
})
