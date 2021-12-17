require('dotenv').config()
const express = require('express')
let morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)



//Define  post token
morgan.token('post', (req, res) => JSON.stringify(req.body))

app.use(morgan(function (tokens, req, res) {
  if (tokens.method(req, res) === 'POST'){
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.post(req, res)
        ].join(' ')
  } else {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }
}))




//get persons list
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

// get count of persons
app.get('/info',(request,response)=>{
  const currentDate = new Date().toLocaleString();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  Person.find({})
  .then(persons=>{
    response.send(      
      ` <p>Phonebook has info for ${persons.length} people</p>    
        <p>${currentDate} (${timeZone})</p>`  
     )
  })
   
})

// get a person with id 
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person){
    response.json(person)
    } else{
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})


// Add new person
app.post('/api/persons', (request, response) => {

  const body = request.body
 
    if (!body.name || !body.number) {
    return response.status(400).json({ error: 'The name or number is missing' })
  }
    const person = new Person({
      name: body.name,
      number: body.number,
    })
  
  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})

//update a person
app.put('/api/persons/:id', (request, response, next) => {

  const body = request.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

// delete a person with id
app.delete('/api/persons/:id', (request, response,next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id).then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})




const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
