require('dotenv').config()
const express = require('express')
let morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')




app.use(cors())
app.use(express.json())



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





app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})


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


app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})



app.post('/api/persons', (request, response) => {

  const body = request.body
 
    if (!body.name || !body.number) {
    return response.status(400).json({ error: 'The name or number is missing' })
  }
    const person = new Person({
      name: body.name,
      number: body.number,
    })
  
  
  // const personExist=Person.find(person => person.name === body.name)
  //  if(personExist) {
  
  //   return response.status(400).json({ 
  //      error: 'name must be unique' 
  //   })
  // }

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndRemove(id).then(result => {
    response.status(204).end()
  })
 
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

