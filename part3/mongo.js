const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const namePerson = process.argv[3]
const number = process.argv[4]

const url =
// `mongodb+srv://fullstack:${password}@test.unych.mongodb.net/ُTest?retryWrites=true&w=majority`
 `mongodb+srv://fullstack:${password}@test.unych.mongodb.net/note-app?retryWrites=true`

mongoose.connect(url)

const personScheme = new mongoose.Schema({

  name: String,
  number: String,
})

const Person = mongoose.model('Person', personScheme)


const person = new Person({
    name: namePerson,
    number: number,
  })

if (process.argv.length === 3) {
    console.log('\nPhonebook:')
    Person.find({}).then(persons => {
        persons.forEach( person => console.log(`${person.name} ${person.number}`))
        console.log('')
        mongoose.connection.close()
      })
  } else {
    person.save().then(response => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
  }

  